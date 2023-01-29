---
date: "2022-09-13"
title: "명령형 프로그래밍과 선언형 프로그래밍"
tags: ["Programming"]
description: "'어떻게 하는가'와 '무엇을 하는가'"
---

> 명령형은 **일을 어떻게 처리할지** 설명하는 것이고,<br />
> 선언형은 **어떤 일을 할 것인지** 설명하는 것이다.

‘명령형 프로그래밍과 선언형 프로그래밍’ 으로 검색했을 때 흔히 보이는 설명이다.

언젠간 분명 들어본 적은 있지만, 당시에는 더 깊게 파고들 내용이 아니라고 생각해서 ‘이런 것들이 있구나~’ 하고 넘겼다. 최근에 학습을 하면서 이 두가지 패러다임을 직접 경험할 수 있었고, 이해한 내용을 글로 정리하려 한다.

# 명령형 프로그래밍

문제를 어떻게 해결해야하는지 컴퓨터에게 명시적으로 명령을 내리는 방법을 의미한다.

```jsx
function double(arr) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    results.push(arr[i] * 2);
  }
  return results;
}

function add(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}
```

위 두 가지 코드는 일을 어떻게 처리하는지에 관해 묘사한다는 공통점을 갖는다.

조금 더 상세하게 본다면, 명시적으로 `for` 문을 통해 배열을 반복하고, 원하는 연산을 하기 위한 단계를 명시적으로 나열하고 있다.

# 선언형 프로그래밍

무엇을 해결할 것인지에 보다 집중하여 어떻게 문제를 해결하는지에 대해서는 다른쪽으로 위임하는 방법이다. 그리고, 어떻게 해결하는지에 대해 추상화가 되어 있어야 한다.

```jsx
function double(arr) {
  return arr.map((item) => item * 2);
}

function add(arr) {
  return arr.reduce((prev, current) => prev + current, 0);
}
```

위 두 가지 코드는 무엇이 일어나는지에 관해 묘사한다.

명령형 방식에서 작성했던 직접 상태를 변경하는 코드들은 `map` 과 `reduce` 메서드에 추상화되어 있어서 직접 상태를 변경하지 않는다.

# 선언형으로 컴포넌트 작성하기

리액트를 학습하기 전 바닐라 자바스크립트로 간단한 to do list 웹 앱을 만들어봤다.

어느정도 완성될 때 쯤에 다시 보니 코드를 읽는 것도 어려웠지만, 수정과 재사용이 무척 어렵다는 것을 깨닫고 어떤 부분이 문제인지 찾아봤다.

아래 코드는 맨처음 작성했던 컴포넌트의 state를 기준으로 렌더링 하는 함수다.

```jsx
// 기존에 작성한 코드
this.render = () => {
  for (const { id, title } of this.state) {
    const li = document.createElement("li");
    li.dataset.id = id;
    li.classList.add("to-do-item");
    li.draggable = true;
    li.innerText = title;

    const button = document.createElement("button");
    button.classList.add("delete-btn");
    button.innerText = "아이템 삭제";

    li.appendChild(button);
    this.$target.appendChild(li);
  }
};
```

기존에 작성한 코드를 보면 한눈에 파악도 안될 뿐더러, 마크업 구조를 변경할 때 발생 가능한 사이드 이펙트도 쉽게 유추가 되질 않는다.

```jsx
// 선언형으로 리팩토링한 코드
this.render = () => {
  this.$target.innerHTML = `
    <input type="text" id="add-item-input" placeholder="아이템 추가">
    ${this.state
      .map(
        ({ id, title }) => `
      <li data-id="${id}" class='to-do-item' draggable="true">
        ${title}
        <button class='delete-btn'>아이템 삭제</button>
      </li>`
      )
      .join("")}
  `;
};
```

리팩토링한 코드를 보면, 마크업 구조가 한 눈에 들어오고, 엘리먼트의 속성을 추가하거나 구조를 변경하기에 굉장히 용이하다는 것을 알 수 있다.

# 정리

- 명령형 프로그래밍은 일을 어떻게 해결하는지 컴퓨터에게 명시적으로 명령을 내리는 방법이다.
- 선언형 프로그래밍은 무엇을 해결할 것인지에 보다 집중하여 어떻게 해결할지는 다른쪽으로 위임하는 방법이다.
  - 선언형 프로그래밍에는 해결방법에 대한 추상화가 필요하다.

## 리액트와 선언형

React의 공식 홈페이지에서 React를 선언형이라고 소개한다.

> React는 상호작용이 많은 UI를 만들 때 생기는 어려움을 줄여줍니다. 애플리케이션의 각 상태에 대한 간단한 뷰만 설계하세요. 그럼 React는 데이터가 변경됨에 따라 적절한 컴포넌트만 효율적으로 갱신하고 렌더링합니다.
>
> 선언형 뷰는 코드를 예측 가능하고 디버그하기 쉽게 만들어 줍니다.

[$card](https://ko.reactjs.org)

왜 리액트를 선언형이라고 부르는지는 리액트를 충분히 학습한 뒤에 작성해보려 한다.
