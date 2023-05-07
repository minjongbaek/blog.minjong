---
date: "2022-10-30"
title: "Map과 Object의 차이"
tags: ["JavaScript"]
description: "key를 이용해 값을 저장하고, 탐색하고 삭제하는 것은 같다."
---

자바스크립트에서 `Object` 와 `Map` 은 상당히 유사하다. 둘 다 `key` 를 이용해 값을 저장하고, 탐색하고, 삭제할 수 있다. 그동안 `get` `set` 메서드를 제공하는 `Map` 보다 프로퍼티에 직접 접근 가능한 `Object` 가 편하다고 생각하여 `Object` 만 사용했었다. 이번에 과제를 진행 하면서 이 둘의 차이점이 궁금해져서 알아보고 정리하고자 한다.

# Key

둘 다 `key` 를 이용해 값을 저장하고, 탐색하고, 삭제할 수 있다는 점은 같지만 다른 부분도 있다.

<table>
  <thead>
    <tr>
      <th></th>
      <th colspan="5">Map</th>
      <th colspan="5">Object</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>기본키</td>
      <td colspan="5">기본 키를 포함하고 있지 않고, 사용자가 직접 추가한 내용만 포함한다.</td>
      <td colspan="5">프로토타입을 갖기 때문에, 사용자가 추가한 키와 충돌할 수 있는 키가 존재할 수 있다.</td>
    </tr>
    <tr>
      <td>타입</td>
      <td colspan="5">함수, 객체 등 타입에 제약을 받지 않는다.</td>
      <td colspan="5">String 이나 Symbol 타입만 허용된다.</td>
    </tr>
    <tr>
      <td>순서</td>
      <td colspan="5">키의 삽입 순서를 보장한다.</td>
      <td colspan="5"><a href="https://tc39.es/ecma262/#sec-ordinaryownpropertykeys%EC%97%90" target="_blank" rel="nofollow">ECMAScript 명세</a>에 따라 순서를 일부 보장할 수 있다.</td>
    </tr>
  </tbody>
</table>

## Object에서 Number 타입의 키?

`Object` 명세를 보면 `key` 에는 `String` 이나 `Symbol` 타입만 가능하다고 하는데, `Number` 타입의 키를 삽입하면 별 에러 없이 코드가 정상적으로 작동한다. 그 이유는 무엇일까?

자바스크립트는 `Object` 의 키를 내부적으로 문자열로 변환 하여 저장하고, `[]` 처럼 대괄호 표기법을 이용해 값을 확인하는 경우 괄호 내 값을 암묵적으로 문자열로 변환한다.

```jsx
const obj = { 1: "one", true: "참", console: "콘솔" };

console.log(obj[1]); // one
console.log(obj[true]); // 참
console.log(obj["console"]); // 콘솔
```

# Size

<table>
  <thead>
    <tr>
      <th></th>
      <th colspan="5">Map</th>
      <th colspan="5">Object</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>크기</td>
      <td colspan="5">size 프로퍼티를 이용해 쉽게 접근 가능하다.</td>
      <td colspan="5">Object.keys() 와 같은 메서드를 이용해 구할 수 있다.</td>
    </tr>
  </tbody>
</table>

<br />

```jsx
const object = { name: "minjong", age: 8 };

const map = new Map();
map.set("name", "minjong");
map.set("age", 8);

console.log(Object.keys(object).length); // 2
console.log(map.size); // 2
```

# Iteration

<table>
  <thead>
    <tr>
      <th></th>
      <th colspan="5">Map</th>
      <th colspan="5">Object</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>반복</td>
      <td colspan="5">iterable한 객체로 직접 반복이 가능하다.</td>
      <td colspan="5"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol" target="_blank" rel="nofollow">iterable protocol</a> 이 구현되지 않아 Object.entries 와 같은 메서드나 for...in 문을 사용하여 열거 가능한 속성들에 대해 직접 반복 가능하다.</td>
    </tr>
  </tbody>
</table>

```jsx
const object = { name: "minjong", age: 8 };

const map = new Map();
map.set("name", "minjong");
map.set("age", 8);

for (const value of Object.entries(object)) {
  console.log(value);
}

for (const value of map) {
  console.log(value);
}
```

# Performance

<table>
  <thead>
    <tr>
      <th></th>
      <th colspan="5">Map</th>
      <th colspan="5">Object</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>반복</td>
      <td colspan="5">키-값 쌍을 자주 추가 및 제거하는 경우 더 나은 성능을 보인다.</td>
      <td colspan="5">키-값 쌍의 빈번한 추가 및 제거에 최적화 되지 않았다.</td>
    </tr>
  </tbody>
</table>

## Map의 성능이 더 좋다?

MDN 내용을 보면 데이터의 추가 및 삭제가 자주 일어나는 경우에 `Map` 이 더 좋은 성능을 낸다고 설명한다. 직접 실험해보자.

```jsx
const object = {};
const map = new Map();
const n = 1000000;

let result;
console.time("Object");
for (let i = 0; i < n; i++) {
  object[i] = i;
}
console.timeEnd("Object");
console.time("Map");
for (let i = 0; i < n; i++) {
  map.set(i, i);
}
console.timeEnd("Map");
```

![테스트 결과. Object가 훨씬 빠르다.](/images/posts/compare-map-and-object/result.png)

테스트 결과. Object가 훨씬 빠르다.

1,000,000 번 반복하면서 데이터 삽입을 한 테스트 결과다. `Object` 의 성능이 더 좋은 것으로 나와 여러 환경에서 시도 했으나 모두 동일한 결과를 보였다. 삭제도 마찬가지.

<details>
<summary>찾아보니 나와 비슷한 실험을 한 뒤에 의문을 갖는 사람들이 몇 있는 것 같았다. <s>내가 알지 못하는 v8 엔진의 최적화나 테스트 환경에 문제일 수 있으니 추후 확인하는대로 업데이트 하도록 하자.</s></summary>

  <ul>
    <li href="https://stackoverflow.com/questions/32886522/javascript-objects-vs-map-performance-chrome-v8-node-js"><a>Javascript Objects vs Map performance (Chrome, V8, Node JS)</a></li>
    <li><a href="https://stackoverflow.com/questions/66931535/javascript-object-vs-map-set-key-lookup-performance">Javascript Object vs Map/Set key lookup performance</a></li>
  </ul>

</details>

혼자서 유의미한 정보를 얻을 수 없어서 데브코스 강사님, 멘토님들에게 질문을 드렸고, 좋은 정보를 얻을 수 있었다.

- 테스트 코드에 `Map` 의 `get` `set` 메서드에 대한 함수 호출 비용이 포함됨.
- `Map` 은 iterable 하게 동작할 수 있도록 요소가 삽입, 삭제되는 경우 재배치되지만, `Object` 는 그렇지 않음.
- key의 타입에 따라 성능 차이가 발생할 수 있다. 대체적으로 문자열인 경우에 `Map` 의 성능이 더 좋다.

# 직렬화 및 파싱

|                | Map                                       | Object                                         |
| -------------- | ----------------------------------------- | ---------------------------------------------- |
| 직렬화 및 파싱 | 직렬화 또는 파싱에 대한 기본 지원이 없다. | JSON으로의 직렬화, 파싱을 기본적으로 지원한다. |

## Map 에서 직렬화 및 파싱

직렬화와 파싱을 기본적으로 지원하지 않지만, [`JSON.parse()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 의 `replacer` 파라미터와 [`JSON.stringify()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 의 `reviver` 파라미터를 이용하면 가능하다.

- [Does JavaScript guarantee object property order?](https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order/38218582#38218582)

# 마무리

그동안 사용하기 편하다는 이유로 `Object` 만을 주로 사용했는데 둘의 차이점을 명확하게 알게되어 어떤 상황에 어떤 객체를 사용해야하는지 알게 되었다.

# 참고

[Objects vs. Maps - Map | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps)
