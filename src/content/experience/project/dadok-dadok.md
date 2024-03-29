---
startDate: 2023-02-01
endDate: 2023-05-01
title: "다독다독"
description: "책장으로 책에 대한 인사이트를 공유하고 소통하는 독서 소셜 플랫폼"
skills: ["TypeScript", "Next.js", "React", "React-Query", "Recoil", "Chakra UI"]
github: "https://github.com/prgrms-web-devcourse/Team-Gaerval-Dadok-FE"
link: "https://dev.dadok.site"
---

**3D 책 컴포넌트 구현**

- 책 표지에서 가장 많이 사용 되는 색상을 추출하여 책등 렌더링
- 도서 이미지를 제공하는 카카오 서버와의 CORS 이슈를 해결하기 위한 프록시 설정

**사용자 프로필 페이지 구현**

- [Suspense와 ErrorBoundary를 이용해 상태에 따른 UI를 선언적으로 렌더링하도록 구현](https://github.com/prgrms-web-devcourse/Team-Gaerval-Dadok-FE/pull/320)
  - [Suspense와 React Query를 같이 사용할 때 쿼리의 성공 상태를 보장하는 커스텀 훅 작성](https://github.com/prgrms-web-devcourse/Team-Gaerval-Dadok-FE/pull/344)
- Presentational & Container 패턴을 적용하여 컴포넌트의 역할을 명확히하고 재사용성 향상

**책 검색 페이지 구현**

- 키보드 입력시 디바운싱을 통해 이벤트를 제어하여 API 호출 빈도 감소

**Next.js pages -> app router로 마이그레이션**

- 첫 JS 로드 크기 223KB -> 102KB로 감소

**지속적으로 UI/UX 개선 중**
