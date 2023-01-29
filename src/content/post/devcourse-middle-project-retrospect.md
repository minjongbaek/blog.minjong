---
date: "2023-01-27"
title: "디그디그딥 프로젝트 회고"
tags: ["데브코스"]
description: "커뮤니케이션을 통한 학습을 제공하는 개발자 전용 SNS"
---

약 2주 간의 팀 프로젝트가 끝이 났다. 그동안 배웠던 내용들을 실제 프로젝트에 적용하면서 많은 것을 배울 수 있었다.

# 프로젝트 소개

![프로젝트 소개](/images/devcourse-middle-project-retrospect/project-introduction.png)

**디그디그딥은 하나의 주제, 개념, 지식에 대해 깊게 이야기 할 수 있는 장소를 제공한다.** 깊게 땅을 파는 두더지로 부터 영감을 받았다.

사용자에게 학습을 시작할 수 있는 `그라운드`를 제공한다.

사용자는 그라운드에서 `디깅`을 통해 서로 의견을 나누며 더욱 깊이있는 학습을 할 수 있다.

- 프로젝트 배포 주소: [https://dig-dig-deep.vercel.app](https://dig-dig-deep.vercel.app)
- Github: [https://github.com/prgrms-fe-devcourse/FEDC3_DigDigDeep_Yuri](https://github.com/prgrms-fe-devcourse/FEDC3_DigDigDeep_Yuri)

# 주제 선정

데브코스의 프로젝트 요구사항은 주어진 **API와 React 혹은 Vue.js를 이용하여 소셜 네트워크 서비스를 구현**하는 것이었다.

다들 무언가를 계속 배우고 있어서 그런지 `스터디` 키워드가 공통으로 나왔고, 이 키워드를 중심으로 브레인스토밍을 했다.

![브레인스토밍](/images/devcourse-middle-project-retrospect/brainstorming.png)

많은 의견을 나누고 합의점을 찾아가며, 결국 커뮤니케이션을 통한 학습을 제공하는 개발자 전용 SNS로 주제를 선정했다.

# 기술 스택

![기술 스택](/images/devcourse-middle-project-retrospect/stack.png)

**타입스크립트는 내가 강력하게 어필했다.**

타입스크립트를 배우면서 '오, 이거 개발할 때 제법 편리하겠는데?'라고 생각했고, 요즘 채용 공고를 보더라도 타입스크립트를 기본적으로 요구하고 있는 추세여서 그냥 넘어갈 수가 없었다.

타입스크립트에 대한 두려움이 있는 팀원도 있었서 걱정도 됐지만, 프로젝트가 끝나고 팀 회고를 할 때는 다들 타입스크립트에 익숙해졌다고 말하는 것을 보면서 타입스크립트를 사용하길 잘했다고 생각했다.

# 기능 구현

기능은 모두가 동의하는 적절한 단위로 나눴으며, 프로젝트 도중 시간 여유가 좀 있는 경우 다른 팀원의 일을 나눠서 작업했다.

- axios 모듈화
- 회원가입 & 로그인
- 사용자 프로필 편집
- 사용자 프로필 - 팔로워, 팔로잉 목록
- 모달, 토스트, 이미지 컴포넌트

## axios 모듈화

제일 먼저 시작한 작업이다. 팀에서는 비동기 통신을 위해 `axios`를 사용하기로 했다.

일부 API의 경우 헤더에 포함된 토큰 값을 이용해 인증 여부를 확인했는데, `axios` 의 `interceptor` 를 활용하면 쉽게 처리할 수 있을 것 같았다.

처음에는 아래와 같이 코드를 작성했다.

```typescript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  // 토큰을 헤더에 등록한다.
  return config;
});

export default axiosInstance;
```

우리는 토큰과 유저 정보를 `recoil`로 관리하고 있고, 통신에 대한 에러를 다른 hook 들과 조합해서 처리하면 편리할 것 같아서 `interceptor`를 훅으로 구현해보자고 생각했다.

```typescript
// util/axios.ts
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
```

```typescript
// hooks/useAxiosInterceptor.ts
const useAxiosInterceptor = () => {
  const token = useRecoilValue(tokenState);

  const requestHandler = useCallback(
    (config: AxiosRequestConfig) => {
      // 토큰을 헤더에 등록한다.
    },
    [token]
  );

  useEffect(() => {
    const requestInterceptors =
      axiosInstance.interceptors.request.use(requestHandler);
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptors);
    };
  }, [requestHandler, token]);
};

export default useAxiosInterceptor;
```

그리고 최상단인 App 컴포넌트에서 훅을 호출하여 App이 렌더링 될 때 `interceptor` 에 `requestHandler` 를 등록하게 했다.

멘토님께서 나중에 말씀하시길, `useAxiosInterceptor` 훅이 App 컴포넌트가 처음 렌더링 될 때만 쓰여진다면 App 컴포넌트 내에서 함수로 작성하는 것이 더 적절할 것 같다는 피드백을 받았다.

확실히 `useEffect`를 통해 `interceptor` 를 등록하고 해제하다보니 다른 사람이 이 훅을 봤을 때 처음 App이 렌더링 될 때 호출되구나 라고 한 눈에 파악하기는 쉽지 않을 것 같다. 이 부분은 리팩터링을 시도해봐야겠다.

추후에 에러는 각자 핸들링 하기로 해서 `responseInterceptor` 는 사용하지 못했지만, 모달이나 토스트를 사용해서 적절하게 에러 핸들링을 할 수 있을 것 같다.

## 회원가입 & 로그인

[React Hook Form](https://react-hook-form.com/) 라이브러리로 손 쉽게 구현 가능했다.

아이콘 추가, 리셋 버튼 구현, 유효성 검사 룰 작성, 상황에 맞는 스타일을 작성 했으며 크게 어려운 부분은 없었다.

![회원가입](/images/devcourse-middle-project-retrospect/signup.gif)

## 사용자 프로필 편집

폼 데이터를 서버로 `POST` 하는 것은 로그인, 회원가입과 똑같았는데 다른 점이 있다면 프로필 사진을 변경할 수 있다는 것이다.

내가 로컬에서 선택한 이미지를 화면에 보여주는 기능이 필요했다. 이미지는 `Blob` 객체기 때문에 `<img />`의 `src`로 바로 전달할 수 없었다. `URL.createObjectURL()` 메서드를 이용해 URL로 변환하여 사용했다.

```tsx
const [previewSrc, setPreviewSrc] = useState(src);

const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  else {
    const file = e.target.files[0];
    setPreviewSrc(URL.createObjectURL(file));
  }
};

return (
  <>
    <img src="previewSrc" alt="profile-image" />
  </>
);
```

![프로필 편집](/images/devcourse-middle-project-retrospect/profile-edit.gif)

## 사용자 프로필 - 팔로워, 팔로잉 목록

팔로워, 팔로잉 목록은 API의 제약 사항 때문에 어려움을 겪었다.

1. 팔로우 목록을 조회하는 API에 팔로잉, 팔로워가 구분되어 있지 않다.
2. 사용자를 구분할 수 있는 id만 포함되어있다.

이를 해결하기 위해 처음 데이터를 받고나면 **1. 선택한 탭에 맞는 사용자를 필터**링하고, **2. 필터링 된 사용자 id로 사용자 정보를 조회** 해야 했다.

이 과정에서 여러 사용자 정보 요청을 병렬적으로 처리하기 위해 `Promise.allSettled()` 을 사용했다. `Promise.all()` 과의 차이점은 순서를 보장한다는 것이다.

주의할 점은 `Promise.all()` 과 달리 `reject` 되어도 결과를 무조건 배열에 담아 반환하기 때문에 실패한 Promise 함수가 있는지 확인해야한다.

```ts
Promise
  .allSettled
  // API 호출
  ()
  .then((results) => {
    const users = results.map((result) => {
      if (result.status !== "fulfilled" || !result.value)
        throw new Error("Error");
      return result.value;
    });
    setUsers(users);
  })
  .catch((error) => {
    setUsers([]);
    console.error("에러 발생!");
  });
```

![팔로잉, 팔로우 목록](/images/devcourse-middle-project-retrospect/profile-follow.gif)

## 모달 컴포넌트

처음에는 모달 컴포넌트를 만들 때 사용하는 쪽에서 컴포넌트를 불러와 children prop 을 넘겨주는 방식을 생각했다.

그런데 모달 컴포넌트의 props가 변경되면 사용하는 쪽도 대응을 해야하는 것이 비효율적이라고 생각했고, `recoil`을 사용중이니까 쉽게 글로벌한 컴포넌트를 만들 수 있을 것 같아서 바로 실행에 옮겼다.

```ts
// recoil/atoms/modal.ts
import { atom } from "recoil";

export type ModalProps = {
  message: string;
  handleClose?: (...arg: any[]) => void;
  handleConfirm?: (...arg: any[]) => void;
};

export const modalState = atom<ModalProps | null>({
  key: "modalState",
  default: null,
});
```

```ts
// hooks/useModal.ts
import { useRecoilState } from "recoil";
import { ModalProps, modalState } from "../recoil/atoms/modal";

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const showModal = (modalProps: ModalProps) => {
    setModal(modalProps);
  };

  const hideModal = () => {
    setModal(null);
  };

  return { modal, showModal, hideModal };
};

export default useModal;
```

`useModal` 을 통해 recoil로 관리되는 modalState 를 변경할 수 있도록 구현했다.

```tsx
import { useRecoilValue } from "recoil";

const Modal = () => {
  const modalProps = useRecoilValue(modalState);
  return <>{modalProps ? <StyledModal {...modalProps} /> : null}</>;
};
```

그리고 modalState 를 기반으로 렌더링 되는 모달 컴포넌트를 구현했다.

이제 최상단인 App 컴포넌트에서 import 한 뒤에 원하는 곳에서 `useModal` 을 통해 쉽게 모달을 화면에 띄울 수 있었다.

```tsx
showModal({
  message: "로그아웃 할거야?",
  handleConfirm: async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  },
});
```

![모달](/images/devcourse-middle-project-retrospect/modal.gif)

## 토스트 컴포넌트

토스트 컴포넌트도 모달 컴포넌트 처럼 훅과 `recoil` 을 이용해서 글로벌한 컴포넌트로 작성했다.

![토스트](/images/devcourse-middle-project-retrospect/toast.gif)

## 이미지 컴포넌트

큰 이미지가 업로드 되는 경우 이미지를 내려받는데 시간이 너무 오래 소요됐다. 업로드 파일의 사이즈를 제한하도록 처리를 했지만 효과는 미비했다.

사용자 경험을 개선하기 위해 이미지가 로드되지 않았다면 스켈레톤을 제공하는 형태로 개선했다. `<img />` 의 `load` 이벤트로 쉽게 구현이 가능했는데 한 가지 문제가 있었다. 메모리에 캐싱된 이미지는 `load` 이벤트가 트리거 되지 않아서 계속 스켈레톤을 보여주는 버그가 있었다.

![이미지 로딩](/images/devcourse-middle-project-retrospect/image-loading.gif)

`<img />` 의 `complete` 속성을 이용하면 이미지가 로드 됐는지 확인할 수 있다는 것을 알게 됐고 렌더링 되는 시점에 `complete` 됐다면 바로 이미지를 보여주도록 처리했다.

![이미지 컴포넌트](/images/devcourse-middle-project-retrospect/image-component.gif)

# 배포

배포는 `vercel` 을 통해 진행했다. 한 가지 이슈가 있었는데 서버가 HTTPS를 지원하지 않아서 `Mixed content` 이슈가 있었다. 브라우저가 HTTPS로 요청을 보내는 것처럼 인식시켜주기 위해 프록시서버가 필요하다고 생각했다.

단순 리다이렉트만 시켜주는 거라면 `Nginx`만으로 쉽게 서버를 만들어 줄 수 있지만, 인스턴스 비용이나 도메인 등의 다른 문제가 발생했다.

찾아보니 `vercel`에서 제공하는 `rewrites` 옵션을 사용하면 쉽게 해결할 수 있을 것 같았다.

```json
{
  "rewrites": [
    {
      "source": "/api/:url*",
      "destination": "{{ API_URL }}/:url*"
    }
  ]
}
```

프록시는 설정했는데 이번엔 배포할 때 문제였다. vercel.json 파일을 git에 포함시키지 않고 `vercel cli`로 가능하긴 했지만 누군가 매번 수동으로 배포해야 했기에 스마트한 방법은 아니었다.

`vercel`에서 git을 연결했을 때처럼 특정 브랜치에 푸시 이벤트가 발생하면 자동으로 배포되길 원했다. 예전에 github action을 이용해서 특정 브랜치에 이벤트가 발생하면 미리 정의해둔 작업을 수행할 수 있다는 이야기를 들은 적이 있어 github action을 살펴보기로 했다.

CI/CD에 주로 사용되기에 엄청 어려울 것이라 생각했는데, 그냥 쉘 스크립트를 작성하는 것이었다. main 브랜치에 push 이벤트가 발생하면 checkout 하여 소스를 vercel.json을 생성한 뒤에 배포를 하는 게 끝이었다. 민감한 데이터는 github secrets으로 설정했다.

```yaml
name: Vercel Production Deployment
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

on:
  push:
    branches: main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: create vercel.json
        run: |
          touch vercel.json
          echo '
          {
            "rewrites": [
              {
                "source": "/api/:url*",
                "destination": "${{ secrets.API_BASE_URL }}/:url*"
              }
            ]
          }
          ' >> vercel.json
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

정상적으로 배포가 되는 것을 확인한 뒤에, PR이 올라가면 preview 링크를 제공하고, build 테스트를 하면 좋을 것 같아 workflow를 추가로 작성했다.

![github-action](/images/devcourse-middle-project-retrospect/github-action.png)

최종 프로젝트 때는 빌드, 배포뿐 아니라 테스트를 하는 것도 도전해 봐야겠다.

# 마치며

예전 회사에서는 협업인 듯 협업이 아닌 수직적인 형태로 업무가 진행됐기 때문에 팀 프로젝트는 처음과 같았다. 걱정이 많았는데 각자의 장점이 다르고 명확해서 좋은 결과물이 나온 것 같다. 백엔드 API도 직접 구현해서 계속해서 이 프로젝트를 개선할 계획이다.

상태를 기반으로 렌더링 하는 컴포넌트를 작성하는 것에 이제는 능숙해진 것 같고, 타입스크립트를 적용하면서 '오~ 이런 게 되네?'와 '아니, 이것도 안 돼!?'를 반복했는데 몸으로 직접 겪으니까 타입스크립트를 사용하는 것에 이제 두려움은 없는 것 같다.

그리고, 사용자 폼을 라이브러리를 이용해 구현하다보니 '웹에서 가장 기본적인 기능을 라이브러리로 구현하는 것이 맞는 걸까?' 하는 의구심이 생겨서 모달이나 토스트를 구현할 때는 라이브러리를 사용하지 않았다. 나중에 멘토님과 커피챗을 통해 라이브러리를 쓰는 것이 나쁜 것이 아니며, 편하고 검증된 라이브러리가 있다면 필요할 때 사용하는 것은 좋다는 것을 깨달았다.

특히 이번 프로젝트를 통해 개발 외적인 것도 많이 얻어 갈 수 있었다. 특히 첫 팀 프로젝트라서 너무 좋은 결과물을 만들어 내고 싶은 욕심에 팀 사기에 부정적인 영향을 끼칠 수 있는 말을 했던 것 같다. 드는 생각을 바로 말로 하는 것이 아니라, 다른 사람의 입장에서 충분히 생각해 보고 내 생각을 정리해서 의견을 정확하게 전달하는 노력이 필요할 것 같다.

이번 프로젝트에서 보완해야 할 것을 다음 프로젝트때는 꼭 지킬 수 있도록 노력해야겠다. 🙂
