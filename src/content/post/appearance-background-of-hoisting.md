---
date: "2022-09-19"
title: "호이스팅의 등장 배경"
tags: ["JavaScript"]
description: "var는 이제 거의 사용하지 않는데 호이스팅을 알 필요가 있을까?"
thumbnail: "호이스팅"
---

# 호이스팅의 등장 배경

작년에 자바스크립트 인터뷰에서 아직도 왜 호이스팅을 물어보냐는 [트윗](https://twitter.com/dan_abramov/status/1362530955420987396)이 화제가 되었다.다. es6 에서 등장한 `const`와 `let` 으로 인해 호이스팅을 만날 일이 많지 않은 것이 사실이다.

최근 진행하고 있는 스터디에서 강사님이 말하길 ‘단순하게 주입식으로 무언가를 암기하는 것보다. **해당 기술이나 개념이 왜 등장했는지 배경을 아는 상태에서 접근하는 것이 중요**하다고 말씀하셨다. 그래서 이번 기회에 호이스팅의 등장 배경에 대해 알아보려고 한다.

# 호이스팅

자바스크립트는 소스코드가 실행되는 시점 전 단계에서 소스코드의 평가 과정을 거친다. 이때 자바스크립트 엔진은 모든 선언문을 소스코드에서 찾아내어 먼저 실행한다.

```jsx
console.log(score); // undefined
console.log(sum(10, 5)); // 15

var score;

function sum(a, b) {
  return a + b;
}
```

위 코드를 보면 `score` 변수와 `sum` 함수를 `console.log` 이후에 선언했음에도 참조에러가 발생하지 않는다.

이처럼 자바스크립트에서 선언문을 코드 최상단으로 끌어 올린 것처럼 작동하는 특징을 호이스팅이라고 한다.

# 호이스팅의 등장 배경

호이스팅은 함수를 선언하는 순서의 자유를 보장하기 위해 등장했다.

> 명령은 본질적으로 순차적이므로 자연스러운 순서가 존재하지만 선언은 그렇지 않다. 함수 f가 함수 g를 쓴다 해도 f가 g보다 먼저 나오는 게 자연스러울 수 있다. 가독성은 차치하고라도, g가 f에 다시 의존한다면 어떨까?

자바스크립트는 호이스팅을 통해 이러한 문제를 해결하고자 했다. 그러나 의도치 않게 `var` 키워드를 사용해 선언한 변수도 함께 최상위로 옮겨져 버리는 현상이 발생해버렸다.

아래는 자바스크립트 개발자 BrendanEich의 트윗이다.

<blockquote class="twitter-tweet tw-align-center"><p lang="en" dir="ltr"><a href="https://twitter.com/aravind030792?ref_src=twsrc%5Etfw">@aravind030792</a> var hoisting was thus unintended consequence of function hoisting, no block scope, JS as a 1995 rush job. ES6 &#39;let&#39; may help.</p>&mdash; BrendanEich (@BrendanEich) <a href="https://twitter.com/BrendanEich/status/522395336615428097?ref_src=twsrc%5Etfw">October 15, 2014</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 변수 호이스팅의 문제점

함수 내에서 `var` 로 선언한 변수는 함수레벨 스코프를 갖지만, 그렇지 않은 경우에는 모두 전역 스코프를 갖게 된다.

위에서 언급한 의도하지 않은 현상으로 인해 `var`로 선언한 변수가 전역 변수처럼 작동했고, 이는 아래와 같은 문제점을 야기했다.

1. 코드 어디서든 참조하고 변경할 수 있는 암묵적 결합을 허용한다.
2. 긴 생명 주기를 가지고 있어 리소스 관리가 어렵다.
3. 스코프 체인의 가장 끝단에 위치하기 때문에 검색 속도가 가장 느리다.
4. 파일이 분리되는 경우에도 하나의 전역 스코프를 공유한다.

결국 이런 문제점을 해결하기 위해 `ES6` 에서 블록 레벨 스코프를 갖는 `const` 와 `let` 이 등장하게 된다.

# const와 let

평가 과정에서 `var` 로 선언된 변수는 선언 단계와 초기화 단계가 동시에 진행되는데, `const` 나 `let` 로 선언한 변수는 선언 단계와 초기화 단계가 분리되어 진행된다.

`let` 이나 `const` 로 선언된 변수는 초기화가 될 때 까지 선언은 되었지만 값을 위한 공간이 메모리에 할당되지 않은 상태인 `TDZ(Temporal Dead Zone)` 구간에 들어가게된다.

`TDZ` 구간에 들어간 변수에 접근을 시도하면 `Uncaught ReferenceError` 에러가 발생하게 되고, 우리는 호이스팅 되지 않은 것 처럼 보는 것이다.

# 호이스팅을 지금도 알아야 할까?

`const` 와 `let` 이 등장하고 `var` 를 이제는 거의 사용하지 않으니 정말로 호이스팅을 몰라도 되는걸까?

‘지금 시작하는 사람들에게는 필요하지 않은 개념이다.’, ‘const와 let도 호이스팅되니 알 필요는 있다.’ 등 여러가지 의견이 있는 것 같다.

내 생각은 이제 막 프로그래밍을 시작한 사람이 아니라면 호이스팅은 알고 넘어가는 것이 좋은 것 같다.

아직 레거시로 `var` 로 작성된 코드가 남아있는 경우도 있을 뿐더러 `const` , `let` , `class` 와 선언문은 `TDZ` 영향을 받기 때문에 코드의 흐름을 파악하는데 도움이 된다고 생각한다.

# 정리

- 호이스팅은 함수를 선언하는 순서의 자유를 보장하기 위해 등장했다.
- 의도치 않게 변수 호이스팅도 함께 구현되었다.
- 변수 호이스팅으로 인해 발생하는 문제들을 해결하기 위해 `let` 과 `const` 가 등장했다.

# 참고

[호이스팅 - 용어 사전 | MDN](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)

[let, const와 블록 레벨 스코프 | PoiemaWeb](https://poiemaweb.com/es6-block-scope)
