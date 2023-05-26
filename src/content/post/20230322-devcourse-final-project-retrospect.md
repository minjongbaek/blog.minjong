---
date: "2023-03-22"
title: "다독다독 프로젝트 회고"
tags: ["데브코스"]
description: "책에 대한 인사이트를 공유하고 소통하는 독서 소셜 플랫폼"
thumbnail: "다독다독"
---

약 4주 간 진행된 프로젝트가 끝이 났다. 중간 프로젝트와는 달리 백엔드 데브코스 교육생 분들과 함께 팀을 이뤄 프로젝트를 수행했다. 이번 프로젝트는 사용해보지 않은 기술을 도입해서 새로운 경험을 할 수 있었다. 덕분에 프로젝트를 재밌게 진행했던 것 같다.

# 프로젝트 소개

![프로젝트 소개](/images/post/20230322-devcourse-final-project-retrospect/project-introduction.png)

다독다독은 **책에 대한 인사이트를 공유하고 소통하는 독서 소셜 플랫폼**이다.

## 핵심 기능

### 📕 책

검색해서 책을 찾고, 다른 사람들이 책에 대해 어떤 생각을 갖고 있는지 볼 수 있다.

### 📚 책장

현직자가 읽었거나 관심있어 하는 책과 이에 대한 정보들을 볼 수 있다.

### 👥 모임

모임 기능을 통해 함께 독서를 하고 책에 대한 생각을 자유롭게 이야기할 수 있다.

## 링크

- [서비스 바로가기](https://dev.dadok.site)
- [FE Repository](https://github.com/prgrms-web-devcourse/Team-Gaerval-Dadok-FE)
- [BE Repository](https://github.com/prgrms-web-devcourse/Team-Gaerval-Dadok-BE)

# 기술 스택

![기술 스택](/images/post/20230322-devcourse-final-project-retrospect/stack.png)

## Next.js

Next.js 13 소개 페이지의 `app` 디렉터리 항목을 보거나 `app` 디렉터리 설정이 활성화된 next.js 서버를 실행시키면 'The app directory is currently in beta and we do not recommend using it in production yet' 와 같은 문구를 볼 수 있다.

우리팀은 최신 기술이라는 이유 하나로 베타 단계인 `app` 디렉터리를 사용했는데 뒤에서 설명을 하겠지만 이것 때문에 팀원 모두가 고생을 했다. 🥲

## Tanstack Query (React Query)

서버 상태 관리를 위해 `Tanstack Query` (React Query)를 사용했다. 이전 프로젝트를 할 때는 useEffect 훅을 통해 API를 요청하고 서버에서 내려준 Response Data를 useState 훅을 통해 상태로 관리했다.

내가 생각하는 이런 상태 관리 방법의 문제는 서버 데이터를 위한 로직이 비대해지고 클라이언트에서 최신의 상태를 보장받을 수 없다는 점이다.

`Tanstack Query`를 사용하면 이런 단점을 비교적 쉽게 해결 할 수 있다. 이 외에 네트워크 요청에 대한 캐싱이나, 구조적 공유를 통한 쿼리의 결과를 기억 하는 등의 장점도 있어서 이번 프로젝트에 도입하게 되었다.

## Chakra UI

디자이너가 없는 상황에서 일관된 인터페이스를 작성하기 위해 UI 라이브러리의 도입을 생각했다. 여러 라이브러리 중 `Chakra UI`를 택한 가장 큰 이유는 `styled-component` 처럼 별도의 컴포넌트를 만들지 않고, props나 state를 토대로 스타일을 쉽게 적용할 수 있기 때문이었다.

외에도 Box 나 Flex 같은 Layout 컴포넌트를 제공한다는 점과 as prop으로 `framer-motion`을 쉽게 적용할 수 있다는 점도 `Chakra UI`를 선택하는 이유가 됐다.

## etc...

사진에 첨부된 기술 스택 외에도 비제어 폼 관리를 위한 `react-hook-form`, 책 표지에서 지배적인 색상을 추출하기 위한 `color-thief` 등의 라이브러리도 사용했다.

# 문제 해결

프로젝트 진행 중 어떤 문제가 발생했고 이를 어떻게 해결했는지 살펴보자.

## Next.js 13 - app directory

Next.js 13의 `app` 디렉터리는 기본적으로 서버 컴포넌트를 사용한다. 그러나 `Chakra UI`를 포함한 많은 라이브러리가 아직 서버 컴포넌트를 완벽하게 지원하지 않아서 문제가 많았다.

클라이언트 컴포넌트를 사용해야하는 곳을 래핑한 뒤에 `'use client';`를 작성해주면 일단 작동은 되지만, `Chakra UI`를 사용하고 있기에 최상단 `layout.tsx`에 `'use client';`를 작성해야했다.

전부 `use client`를 붙여서 클라이언트 컴포넌트로 사용할거라면 왜 `app` 디렉터리를 사용해야하는건지 의문이 들었다.

그리고, 페이지 전환시에 애니메이션 효과를 주기 위해 `framer-motion`을 사용했는데 exit 애니메이션이 이상하게 작동하는 문제가 있었다.

![페이지 전환시 애니메이션 두 번 발생](/images/post/20230322-devcourse-final-project-retrospect/animation-twice.gif)

동일한 증상의 [issue](https://github.com/framer/motion/issues/1850#issuecomment-1445239322)를 몇가지 찾을 수 있었는데 크게 도움되는 것들은 없었다.

이것 외에도 `Hydrate` 과정에서 몇몇 에러가 발생하는 등의 이슈가 있었다. 이대로는 좋은 퀄리티를 낼 수 없다는 판단을 하고 프로젝트 기한 1주일 전에 새벽까지 팀원들과 `pages` 디렉터리로 마이그레이션 작업을 진행했다.

![편-안](/images/post/20230322-devcourse-final-project-retrospect/animation-once.gif)

## Kakao Image CORS

![책 표지의 색상을 추출](/images/post/20230322-devcourse-final-project-retrospect/next-api-1.png)

다독다독은 책을 3d 형태로 보여주고 있는데 이때 책 앞면 표지에서 가장 많이 사용된 색상을 추출하여 책의 옆면 색상을 채우고 있다.

처음에는 이미지의 각 꼭지점에서 사용된 색상을 사용하려고 했는데 테두리가 있는 책 표지도 있어서 결과가 만족스럽지 못했다.

다음으로 이미지의 픽셀 하나하나를 체크하면서 가장 많이 사용된 색상을 찾으려 했는데 비주얼적으로 꽤나 만족스러운 결과를 얻을 수 있었지만, 이 경우는 이미지의 크기가 커질 수록 시간 복잡도도 배로 증가한다는 단점이 있었다.

보다 복잡한 알고리즘이 필요하다는 것을 깨닫고, 일단은 기간 내에 완성하기 위해 라이브러리의 힘을 빌리기로 했다. `color-thief` 라는 라이브러리를 사용했는데 내부적으로 `canvas`를 사용하고 있다.

백엔드에서 전달받은 표지 url로 이미지를 받아오는데는 문제가 없었는데, 브라우저의 `canvas` 에서 카카오 이미지 소스를 사용하려고 하면 `CORS` 에러가 발생했다.

![NEXT API](/images/post/20230322-devcourse-final-project-retrospect/next-api-2.png)

이를 해결하기 위해 Next.js API를 만들고 `node-vibrant` 라이브러리를 이용해서 지배적인 색상을 추출하고 클라이언트에 색상 코드만 반환하는 형식으로 구현했다. 하지만, 이렇게 만들어진 API에는 2가지 문제점이 있었다.

1. 병렬 처리가 안돼서 병목현상이 발생한다는 점.
2. Vercel에서 제공하는 인스턴스의 성능이 만족스럽지 않아 속도가 느리다는 점.

그래서, 백엔드로 부터 전달받은 카카오 이미지 URL을 Next API로 전달하여 스트림 형태로 내려 받게끔 API를 구현하여 색상을 추출하는 로직을 `color-thief`를 이용해서 전부 클라이언트에서 수행할 수 있도록 했다.

![bookshelf](/images/post/20230322-devcourse-final-project-retrospect/bookshelf.gif)

# 아쉬운 점

뒤돌아보며 어떤 아쉬운 점이 있었는지 생각해보자.

## MSW 혹은 Next API를 적극적으로 사용하지 않은 것

몇몇 API가 생각보다 늦게 구현되거나, 예상한 스펙과 미세하게 다른 부분도 있었다. API에 문제가 없더라도 이를 연동하는 과정에서 사소한 에러가 발생하기도 했다. `MSW`나 `Next API`로 Mock API를 미리 작성해두고 비동기 요청에 대한 테스트를 미리 해봤다면 불필요한 시간을 줄일 수 있었을 텐데 그러지 못한 점이 참 아쉬운 것 같다.

현업에서도 백엔드 로직이 늦게 완성되는 경우가 많다고 하는데, 다음에 프로젝트를 진행할 때는 실제 API가 구현되지 않았더라도 에러 핸들링까지 작업할 수 있는 환경을 사전에 구축해두면 좋을 것 같다.

## 스프린트 단위를 제대로 지키지 못한 점

MVP(Minimum Viable Product)를 기반으로 스프린트 기간을 설정하고 목표 달성을 위해 해야 할 일을 목록으로 만들었는데 잘 지키지 못한 것 같아 아쉽다. 스프린트 단위마다 결과물을 만들기는 했지만, 목표를 완벽하게 달성했다는 느낌은 받지 못했다.

# 마치며

백엔드 교육생 분들과 협업하여 프로젝트를 진행했기 때문에 현업과 유사한 프로세스를 경험할 수 있었다.

그리고, 지난번 프로젝트보다 잠을 더 줄여가며 프로젝트에 참여했는데 열정 있는 좋은 팀원들과 새로운 기술을 도입하면서 함께 문제를 해결해나가는 과정이 즐거웠다. 돌이켜보면 이번 프로젝트를 통해 새로운 기술을 학습하고 적용하는 것에 대한 부담을 떨쳐내고 극복할 수 있는 계기가 아니었을까 싶다.

공식적인 프로젝트 기간이 끝났으니 '프로젝트 끝!'이 아니라, 위에서 작성한 아쉬운 점도 보완하고 시간 때문에 구현하지 못한 기능들도 구현하면서 이 프로젝트를 지속해나가고 싶다.
