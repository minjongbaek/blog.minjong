---
date: '2022-08-26'
title: '드래그 앤 드롭 이벤트'
tags: ['JavaScript', 'web']
summary: 'Element를 끌어다 놓아보자'
---

요소를 드래그 앤 드롭해서 요소의 순서를 변경해야할 일이 있었다.

예전에는 아무것도 모른 채 jQuery UI나 다른 라이브러리에 의존하여 구현했다면, 이번에는 직접 구현하면서 어떻게 작동하는지 알고 싶었다.

# Drag & Drop API

현재 주요 웹 브라우저들은 모두 Drag and Drop API를 지원하고, 해당 API를 통해 드래그가 가능한 요소를 마우스로 선택해 드래그하고, 드롭할 수 있게 해준다.

## draggable attribute

`draggable` 속성은 전역 속성으로 모든 HTML에서 공통으로 사용할 수 있다.

열거형 속성으로 반드시 `true` or `false` 값을 가져야 하며, 지정하지 않은 경우 브라우저의 기본 동작을 따르게 된다.

# Drag Events

드래그 이벤트라고 하면 단순하게 드래그 되는 동안 발생하는 이벤트와 드롭했을 때 발생하는 이벤트 2개뿐이라고 생각했었는데, 실제로 드래그 이벤트는 여러 가지가 있다는 걸 알게 됐다.

내가 처리해야 할 이벤트는 드래그가 시작되었을 때, 드롭되었을 때, 요소가 대상 위로 지나갈 때 총 3가지다.

## DataTransfer Object

`DataTransfer` 객체는 드래그 앤 드롭 이벤트가 발생하는 동안 데이터를 유지하기 위해 사용할 수 있다. event 객체에서 `dataTransfer` 프로퍼티로 접근 가능하다.

`setData()` 메서드를 통해 지정된 데이터 유형으로 저장 가능하며, `getData()` 메서드를 통해 값을 가져올 수 있다. 권장하는 데이터 유형은 아래 문서를 참고하자.

## 요소가 드롭 대상 위로 지나갈 때 왜 이벤트 핸들링이 필요할까?

드래그된 요소가 드롭 대상 위에서 계속 드래그되고 있을 때 `dragover` 이벤트가 발생한다. 요소를 드롭하길 원한다면 `dragover` 이벤트 리스너에서 `preventDefault()` 메서드를 호출하여 `dragover` 이벤트가 아닌 `drop` 이벤트가 작동할 수 있도록 처리해야 한다.

```jsx
element.addEventListener('dragover', (event) => {
  event.preventDefault();
});
```

# 구현하기

## DragStart

드래그가 시작되면 `DataTransfer` 객체의 `setData()` 메서드를 호출하여 필요한 데이터를 저장한다.

```jsx
element.addEventListener('dragstart', (event) => {
  // 현재 선택된 요소와 일치하는 state item의 index를 찾는다.
  const targetIndex = [...this.state].findIndex(
    ({ id }) => id === Number(event.target.dataset.id)
  );
  // DataTransfer 객체에 index를 저장한다.
  event.dataTransfer.setData('text/plain', targetIndex);
});
```

## DragOver

원하는 요소에 드롭 가능하도록 `preventDefault()` 메서드를 호출한다.

```jsx
element.addEventListener('dragover', (event) => {
  event.preventDefault();
});
```

## Drop

드래그한 요소가 유효한 영역에 드롭되었다면, `DataTransfer` 객체에 저장된 데이터를 읽어와 필요한 로직을 수행한다.

```jsx
liDOM.addEventListener('drop', (event) => {
  // 추가적인 이벤트 (터치나 포인터 등)가 발생하지 않도록 preventDefault() 메서드 호출
  event.preventDefault();

  const state = [...this.state];
  // DataTransfer 객체에서 데이터를 가져온다.
  const itemIndex = Number(event.dataTransfer.getData('text'));

  // 선택된 요소와 일치하는 item과 드롭된 위치에 있던 요소와 일치하는 item을 서로 교체한다.
  const targetIndex = state.findIndex(
    ({ id }) => id === Number(event.target.dataset.id)
  );
  const tmpTarget = state[targetIndex];
  state[targetIndex] = state[itemIndex];
  state[itemIndex] = tmpTarget;

  this.setState(state);
});
```

# 정리

- DragEvent의 종류는 여러가지가 있다.
- DataTransfer 객체를 통해 드래그 앤 드롭 시 데이터를 전달할 수 있다.

![결과물](./result.gif)

# 참고

* [DragEvent - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/DragEvent)
* [DataTransfer - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/DataTransfer)
* [Recommended Drag Types - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types)