### Redux

- #### 리덕스는 리액트의 단방향 데이터 흐름에서 발생하는 복잡성을 해결하기 위해 등장한 상태 관리 도구 라이브러리

  -> 리액트(React)는 단방향 데이터 흐름을 지향하는 프레임워크로, 상위 컴포넌트에서 하위 컴포넌트로 데이터(상태)를 전달하는 구조를 가지고 있음. <br> 이는 props를 통해 이루어지며, 이러한 구조는 데이터 흐름을 예측 가능하고 관리하기 쉽게 만들어줌.
  <br> 하지만 애플리케이션이 커지고 컴포넌트 구조가 복잡해지면, 여러 자식 컴포넌트들에 상태를 전달하기 위해 중간의 모든 컴포넌트들이 불필요하게 props를 받게 되는 "props drilling" 문제가 발생
  <br> 이 문제를 해결하기 위해 리덕스(Redux) 같은 상태 관리 라이브러리가 등장

  -> 리덕스는 store라는 저장소를 만들어 언제든지 접근할 수 있게 함

  -> store는 객체타입

  -> 하지만 컴포넌트가 store의 값을 바로 바꾸거나 요청하지 못 함

<br>

<details>
<summary> redux flow </summary>

![redux](https://github.com/user-attachments/assets/18a31349-831d-4a93-8c3c-d5bb99a535cf)

</details>

- Action: 로그인하기 같은 행동을 받음
- Reducer: 가지고 있는 작업지침 중 해당하는 걸 실행함 - case "로그인하기"
  return {id: userId, password: userPassword, authenticate: true} - 유저 id, password 를 저장하라고 되어 있군, authenticate를 true 로 바꾸라고 되어 있군 - 이후 Reducer가 행동지시에 따라서 Store의 값을 바꿈 - Store의 값이 바뀌면 자동으로 component 바뀌면서 re render 해줌

<br>

  여기서 알아야 하는 리액트 훅

- useDispatch: 액션을 던지는 훅(component →Action 사이)
- useSelector: Store에 있는 값을 가져다 쓸 때 사용하는 훅(Store → Component 사이)


### redux 셋업

```javascript
redux, react-redux 설치
npm install redux react-redux 

index.js
import { Provider } from 'react-redux';

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

src 폴더 안에 redux 폴더
redux 폴더 안에 store.js, reducer 폴더
reducer 폴더 안에 reducer.js
(이때 reducer를 폴더로 만드는 이유는 기능에 따라 여러 파일로 만들어 줄 수 있기 때문)

reducer는 두개의 매개변수를 받음 (state, action)
state는 초기화가 필요함(어떤 state가 있는지 알기위해)

let initialState = {
  count: 0,
};

function reducer(state = initialState, action) {

}
```

### redux 적용

```javascript
1. useDispatch 액션 던져주기, increase란 버튼을 눌렀을때! (그때 값이 바뀌어야 하니까)
action을 던져야 하는데 action은 어떻게 생겼나 룰이 있는 그냥 단순한 객체
반드시 type이라는 키와 선택사항인 payload라는 키가 있어야 함

import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();

    const increase = () => {
    dispatch({type:"INCREMENT"})
  }

2. reducer는 자동으로 dispatch가 던진 액션을 받아올 수 있음
3. Store는 return으로 store의 값을 바꿈
새로운 객체를 전달받아야 본인이 바뀐걸 앎
return 할때 ...state는 기본적으로 쳐야 한다고 생각해야함.

function reducer(state = initialState, action) {
  console.log("action", action);
  if (action.type === "INCREMENT") {
    // 회사에 따라 switch 문으로 하기도 함
    return { ...state, count: state.count + 1 }; // ...state를 하는 이유:
  } // 만약에 state가 여러개면 다른 state값은 유지하되 count만 바꾼다
  // ...spread 문법을 통하여 기존 객체내용을 복사해 새로운 객체에 전달 가능
  return { ...state }; // 기본리턴 필요(위에 조건문에 안맞을때 해줄 리턴
}

switch문인 경우
    switch(action.type) {
        case "INCREMENT":
            return {...state, count: state.count + 1};
        default:
            return {...state}
    }


4. Store 사용하기
이제 App에서 더이상 state는 만들지 않음

import { useSelector, useDispatch } from "react-redux";

function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const increase = () => {
    dispatch({ type: "INCREMENT" });
  };
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increase}>증가</button>
    </div>
  );
}


- 리덕스가 훌륭한 이유는?
    - 내가 부모건 자식이건 상관없이 어디서든 필요하면  state를 가져다 쓸 수 있다.
5. component에서 사용하기
이제 App에서 props로 넘길 필요가 없다. 내가 직접 가져다 쓰면 됨

import React from "react";
import { useSelector } from "react-redux"; // App.js에서 사용할때랑 똑같이 사용

const Box = () => {
  let count = useSelector((state) => state.count);
  return <div>this is box {count}</div>;
};

export default Box

컴포넌트에서 컴포넌트를 사용한다고 해도 사용하는 방법은 똑같음

 6. dispatch에서 payload는 매개변수 같은 개념으로 내가 원하는 정보를 보내줄 수 있음

App.js
<button onClick={login}>Login</button>

const login = () => {
    dispatch({ type: "LOGIN", payload: { id: "song", password: "123" } });
  };

reducer.js
  let initialState = {
  count: 0,
  id: "",
  password: "",
};

// 조건 추가
else if (action.type === "LOGIN") {
    return {
      ...state,
      id: action.payload.id,
      password: action.payload.password
    };
```
