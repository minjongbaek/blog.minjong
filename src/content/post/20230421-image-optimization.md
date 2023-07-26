---
date: "2023-04-21"
title: "avif, webp 포맷을 이용한 웹 이미지 최적화"
tags: ["Web"]
description: "이미지 페이로드를 줄여보자"
---

최근 <a href="/devcourse-final-project-retrospect" target="_blank">디그디그딥 프로젝트</a>의 Lighthouse Performance를 100점으로 개선했다. 이 블로그는 많은 기능을 포함하고 있지 않으니 당연히 100점이 나올거라 예상했지만 95점이 나왔다.

![첫 번째 lighthouse](/images/post/20230421-image-optimization/first-lighthouse.png)

점수를 깎는 가장 큰 원인은 로고 이미지 때문이었는데, 로고를 가져오는데 약 900KB 네트워크 비용이 발생했다. 다양한 네트워크 환경을 고려한다면 확실히 적은 비용은 아니었다.

크롬은 점수를 개선하기 위해 다음과 같은 가이드를 제공했는데

> Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption.

**WebP, AVIF와 같은 이미지 포맷은 PNG, JPEG 보다 더 나은 압축을 제공하기 때문에, 데이터의 소비를 줄일 수 있다**고 한다.

## WebP

구글에서 만든 이미지 포맷으로 Web을 위해서 만들어진 효율적인 이미지 포맷이다. GIF, PNG, JPEG 보다 높은 압축률을 지원하고, 색상 수에 제한이 없으며, 애니메이션 기능과 알파 채널을 지원한다.

장점만 있을 것 같은 WebP에도 단점이 존재한다. 웹을 위한 이미지 포맷이다 보니, 여러 응용프로그램과 일부 Apple 플랫폼 OS와의 호환성이 좋지 않고 클라이언트 하드웨어에서 디코딩 하는데 사양에 따라 많은 리소스를 필요로 하기도 한다.

## AVIF

구글, 넷플릭스와 같은 데이터 통신량이 많은 기업들을 중심으로 개발된 AV1 코덱을 확장하여 개발된 이미지 포맷이다. WebP 처럼 GIF, PNG, JPEG 등의 이미지 포맷을 대체할 수 있고 높은 압축률과 다중레이어, 애미네이션, 메타데이터 지원 등 다양한 기능을 제공한다.

최신 포맷이기 때문에 낮은 범용성 문제를 겪고 있지만, 큰 회사의 경우 스토리지 요금을 줄이기 위해서 고효율 이미지를 적극적으로 도입하는 경향이 있다고 한다. 특히 구글과 넷플릭스 같은 기업이 적극적으로 밀고 있으니 빠르게 해결될 문제일 것이라 생각된다.

## \<picture\>

HTML의 [picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) 태그는 특정 포맷이 지원되지 않는 경우의 대체 이미지 포맷을 지정할 수 있다.

`picture` 태그 내부에 `source` 태그로 로드 가능한 이미지들을 작성하면 된다.

```html
<picture>
  <source srcset="/logo.avif" type="image/avif" />
  <source srcset="/logo.webp" type="image/webp" />
  <img src="/logo.png" alt="logo" />
</picture>
```

브라우저는 `source`의 `srcset` 과 `type` 속성을 확인한 뒤에 장치와 호환 가능한 이미지를 선택해서 이미지를 로드한다.

그리고, `media` 속성을 이용하면 디스플레이의 크기에 따라 적합한 이미지를 로드하는 아트 디렉션도 제공한다.

## 이미지 페이로드 줄이기

원래 사용하던 로고 이미지의 크기는 2520 × 1388 이었는데, 블로그 레이아웃의 너비가 768px 으로 화면에 보여줄 크기보다 더 큰 사이즈였다.

그래서 이미지의 크기를 조정하고 avif, webp 포맷으로 변환했는데 **이미지 페이로드가 909KB -> 21.4KB 로 90%가 넘게 감소했다!**

<div class="flex">

![첫 번째 lighthouse](/images/post/20230421-image-optimization/prev-payload.png)

![첫 번째 lighthouse](/images/post/20230421-image-optimization/new-payload.png)

</div>

## aspect-ratio CSS 속성으로 Cumulative Layout Shift 해결하기

이미지 페이로드를 감소시켜 Performance 점수를 올렸지만 100점을 달성시키지는 못했다. 이미지의 영역을 미리 지정해주지 않아서 Cumulative Layout Shift가 발생하는게 원인이었다.

이미지를 감싸는 컨테이너를 하나 만들어주고 컨테이너에 `aspect-ratio` CSS 속성을 추가했다. `aspect-ratio` 속성을 이용하면 가로 세로 비율로 요소의 크기를 결정한다.

```css
div.container {
  width: 100%;
  aspect-ratio: 16 / 9;
}

img {
  width: 100%;
}
```

## 마무리

이미지 최적화는 성능 개선을 위한 매우 중요한 요소 중 하나인 것 같다. 막연하게 '이미지 최적화? 당연히 중요하겠지...'라고 생각했는데 직접 해보니까 와닿는 것 같다.

폰트를 최적화하는 것처럼 코드를 직접 수정하지 않고도 빠르게 페이지를 로드할 수 있도록 해서 더 나은 사용자 경험을 제공하고, 트래픽을 줄여 서버 비용 감소로 이어질 수 있다.

코드를 잘 작성하는 것도 중요하지만, 작성한 코드가 더욱 원활한 환경에서 작동할 수 있도록 환경을 구성하는 것도 중요한 것 같다.

![결과](/images/post/20230421-image-optimization/result.png)
