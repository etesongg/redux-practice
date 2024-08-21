import { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Box from "./component/Box";

function App() {
  const count = useSelector((state) => state.count);
  const id = useSelector((state) => state.id);
  const password = useSelector((state) => state.password);
  const dispatch = useDispatch();

  const increase = () => {
    dispatch({ type: "INCREMENT", payload: { num: 5 } });
  };

  const login = () => {
    dispatch({ type: "LOGIN", payload: { id: "song", password: "123" } });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT", payload: { num: 5 } });
  };
  return (
    <div>
      <h1>
        {id}, {password}
      </h1>
      <h1>{count}</h1>
      <button onClick={increase}>증가</button>
      <button onClick={decrement}>감소</button>
      <button onClick={login}>Login</button>
      <Box />
    </div>
  );
}

export default App;
