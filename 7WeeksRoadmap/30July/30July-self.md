## UseReducer hook

The useReducer hook in React is a special tool that helps you manage and change the state (data) of your app, especially if there are lots of different changes happening.

```jsx
function reducer(currentState, action) {
  if (action === "add") {
    return currentState + 1;
  } else if (action === "subtract") {
    return currentState - 1;
  } else {
    return currentState;
  }
}

import { useReducer } from "react";

function Counter() {
  // set up your counter, starting at 0
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <button onClick={() => dispatch("subtract")}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch("add")}>+</button>
    </>
  );
}
```
