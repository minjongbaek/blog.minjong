---
startDate: 2023-01-02
endDate: 2023-02-01
title: "디그디그딥"
description: "커뮤니케이션을 통한 학습을 제공하는 개발자 전용 SNS"
skills: ["TypeScript", "React", "Recoil", "Styled-Components"]
github: "https://github.com/prgrms-fe-devcourse/FEDC3_DigDigDeep_Yuri"
# link: "https://dig-dig-deep.vercel.app"
---

**로그인, 회원가입, 사용자 프로필 페이지 구현**

- 사용자 폼과 관련된 컴포넌트를 추상화하여 공통으로 사용할 수 있도록 구현

**지속적인 성능 개선**

- 1차 배포시 90점이던 LightHouse Performance를 100점으로 향상
- Intersection Observer API를 통해 Lazy-loading을 구현하여 필요한 콘텐츠만 빠르게 전달할 수 있도록 개선
- [woff2 폰트에 서브셋 폰트를 적용하여 폰트 페이로드를 크기를 약 600KB → 64KB 감소](https://github.com/prgrms-fe-devcourse/FEDC3_DigDigDeep_Yuri/pull/250)
