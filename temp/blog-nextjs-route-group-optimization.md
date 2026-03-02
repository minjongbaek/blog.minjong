# Next.js App Router: Route Group 분리를 통한 SSR 최적화 여정

## 왜 이 작업을 하게 되었나

프로덕션 환경에서 통합 계정 서비스의 **CPU 사용량이 비정상적으로 높았다.** [bstage 투표 이벤트](https://bstageplus.com/poll/698ecd18c1bbe47a262c4f4b)에 대규모 참여가 몰리면서 회원 수가 하루 만에 20만에서 400만으로 폭증했고, 초당 약 150건의 트래픽이 들어오고 있었는데, 로그인, 회원가입 같은 단순 페이지들도 매 요청마다 서버에서 풀 렌더링을 수행하고 있었고, Node.js 프로세스의 CPU가 치솟았다. 근본적인 원인은 Next.js의 렌더링 전략에 있었다 — 모든 페이지가 Dynamic Rendering으로 강제되어, 요청마다 서버 사이드 렌더링이 발생하고 있었던 것이다.

목표는 명확했다: **실제로 동적 데이터가 필요한 페이지와 그렇지 않은 페이지를 분리하여, 불필요한 서버 처리를 줄이고 CPU 사용량을 낮추자.**

## 배경

Next.js 14 App Router 기반의 통합 계정(Integrated Account) 서비스에서 root layout을 분석해보니 `headers()`와 `cookies()`를 호출하고, `generateMetadata()`에서 tenant API를 호출하여 **20개 전체 페이지가 매 요청마다 동일한 무거운 서버 로직을 실행**하고 있었다.

실제로 `cookies()`와 `generateMetadata()`(tenant API 호출)가 필요한 페이지는 3개뿐이고, 나머지 17개는 클라이언트 컴포넌트 wrapper였다. Route group으로 분리하면 17개 페이지에서 불필요한 서버 사이드 처리를 제거할 수 있다고 판단했다.

## 변경 전후 비교

| 항목 | Before (단일 root layout, 20개 전체) | After - Public (17개) | After - Protected (3개) |
|------|--------------------------------------|----------------------|------------------------|
| `headers()` | O (매 요청) | O (accept-language만) | O (전체) |
| `cookies()` | O (매 요청) | **X** | O |
| `generateMetadata()` | O (tenant API 호출) | **X** | O |
| tenant API fetch | O (매 요청) | **X** | O |
| i18n 프리로딩 | O (1개 언어) | O (1개 언어) | O (1개 언어) |

핵심 절감 포인트: 트래픽 대부분을 차지하는 public 17개 페이지에서 **매 요청마다 발생하던 tenant API fetch, cookies 파싱, generateMetadata 실행이 제거**되었다.

## 변경 사항

### 1. Root Layout을 HTML 셸로 축소

**Before:**
```typescript
// headers(), cookies(), generateMetadata(), ClientProvider 등 포함
export default async function RootLayout({ children }) {
  const headerStore = headers();
  const cookieLanguage = cookies().get(CookieName.LANGUAGE)?.value;
  // ... 언어 감지, i18n 프리로딩, tenant API 호출
  return (
    <html><body>
      <ClientProvider lang={lang} loadPath={loadPath} resources={resources}>
        <main>{children}</main>
      </ClientProvider>
    </body></html>
  );
}
```

**After:**
```typescript
// 순수 HTML 셸만 유지 — 서버 로직 없음
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>{/* viewport, styles, fonts, scripts */}</head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Route Group 분리

- **`(public)/layout.tsx`** — 17개 페이지. `headers()`로 `accept-language`만 읽어 해당 언어의 i18n 리소스를 프리로딩. `cookies()`, `generateMetadata()`, tenant API 호출 없음.
- **`(protected)/layout.tsx`** — 3개 페이지. 기존 root layout 로직 그대로 유지 (headers, cookies, generateMetadata + tenant API)

```typescript
// (public)/layout.tsx — 가벼운 서버 로직
export default async function PublicLayout({ children }) {
  const headerStore = headers();
  const acceptLanguage = parsePrimaryLanguage(headerStore.get('accept-language'));
  const lang = normalizeLanguage(acceptLanguage) ?? Language.EN;
  const loadPath = await getLanguages(false);
  const resources = await preloadI18nResources(loadPath, lang);

  return (
    <ClientProvider lang={lang} loadPath={loadPath} resources={resources}>
      <main>{children}</main>
    </ClientProvider>
  );
}
```

Route group은 URL에 영향을 주지 않으므로 (`/login`은 그대로 `/login`) 기존 URL 구조가 유지된다.

### 3. 다국어 처리 단순화 — 쿠키 기반에서 accept-language 직접 읽기로

**Before:**

기존 다국어 처리는 3단계를 거쳤다:

1. **Middleware**: `accept-language` 헤더를 파싱해 언어 쿠키(`baccount_lang`)에 저장
2. **Root layout**: `cookies()`로 언어 쿠키를 읽어 해당 언어의 i18n 리소스를 프리로딩
3. **ClientProvider**: 클라이언트에서 쿠키/`navigator.language`를 다시 읽어 `i18next.changeLanguage()`로 동기화

이 구조는 **서버-클라이언트 간 언어 상태를 쿠키로 중계**하는 패턴이었는데, 분석해보니 불필요한 복잡성이었다.

**핵심 발견:** 이 서비스는 **앱 내 언어 변경 UI가 없다.** 사용자 브라우저 언어를 기준으로 한 번 결정하고, 새로고침 전까지 변경되지 않는다. 즉, 서버와 클라이언트 간에 동기화할 "변경 가능한 언어 상태"가 애초에 존재하지 않는다.

**After:**

쿠키 중계 없이, 양쪽 layout에서 `accept-language` 헤더를 직접 읽는 것으로 단순화했다:

```typescript
// public/protected layout 모두 동일한 패턴
const headerStore = headers();
const acceptLanguage = parsePrimaryLanguage(headerStore.get('accept-language'));
const lang = normalizeLanguage(acceptLanguage) ?? Language.EN;
const resources = await preloadI18nResources(loadPath, lang);
```

제거된 것:
- Middleware의 언어 쿠키 설정 로직
- ClientProvider의 `navigator.language` 기반 언어 동기화 useEffect
- `baccount_lang` 쿠키 정책

서버에서 사용자의 **브라우저 언어에 맞는 단일 언어만 프리로딩**하여 `resources`로 i18next에 전달한다. `i18next-http-backend`는 폴백 용도로 유지하되, 서버에서 프리로딩된 언어가 정확하므로 실제로 Backend가 호출되는 경우는 거의 없다.

```typescript
// i18n.ts — 서버 프리로딩 리소스 + Backend 폴백
const opt: InitOptions = {
  lng: lang,
  backend: {
    loadPath: loadPath ? loadPath : BASIC_LOAD_PATH,
    customHeaders: { /* CF Access 헤더 */ }
  },
  // resources가 있으면 해당 언어는 Backend를 호출하지 않음
  // resources에 없는 언어를 요청할 때만 Backend가 동작
  ...(resources ? { resources, partialBundledLanguages: true } : {}),
};

const initPromise = i18next.use(Backend).use(initReactI18next).init(opt);
```

### 4. Tenant 메타데이터 클라이언트 복구

Public layout에는 `generateMetadata()`가 없으므로 tenant 이름과 favicon이 서버에서 설정되지 않는다. 대신 `TenantProvider`에서 tenant 데이터 로드 후 클라이언트에서 동적으로 복구한다.

```typescript
// TenantContext.tsx
useEffect(() => {
  if (tenant?.name) {
    document.title = tenant.name;
  }
}, [tenant?.name]);

useEffect(() => {
  if (tenant?.faviconUrl) {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
      || document.createElement('link');
    link.rel = 'icon';
    link.href = tenant.faviconUrl;
    document.head.appendChild(link);
  }
}, [tenant?.faviconUrl]);
```

또한 tenant API 호출 시 `locale` 파라미터를 query key에 포함시켜, 언어별로 올바른 tenant 데이터를 가져오도록 했다.

```typescript
// Before: locale이 query key에 없음 → 캐시가 언어를 구분하지 못함
queryKey: tenantKeys.tenant(tenantId)

// After: locale 포함 → 언어별 독립 캐시
queryKey: tenantKeys.tenant(tenantId, i18n.language)
```

### 5. 중복 코드 정리

- **`parsePrimaryLanguage` 통합** — middleware.ts와 protected/layout.tsx에 각각 존재하던 동일 로직을 `constants/language.ts`로 추출하여 단일 진실 공급원(single source of truth)으로 통합. public/protected layout, middleware 모두 같은 함수를 참조한다.

## 결론

1. **아키텍처 분리** 완료 — public 17개 / protected 3개 페이지가 독립적인 렌더링 경로를 가짐
2. **Public 페이지 서버 처리 경량화** — 매 요청마다 발생하던 tenant API fetch, `cookies()` 파싱, `generateMetadata()` 실행이 제거됨. 트래픽 대부분이 public 페이지이므로 전체 CPU 절감 효과가 큼
3. **Data Cache** 작동 — i18n 리소스 fetch 결과가 `next: { revalidate: 300 }`으로 5분간 캐시
4. **다국어 정확성** — 서버에서 `accept-language` 기반으로 올바른 언어를 즉시 서빙. 쿠키 중계 및 클라이언트 언어 전환 불필요
