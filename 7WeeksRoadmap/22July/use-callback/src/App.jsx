// this useCallback code is LLM generated

// import React, { useState, useCallback } from "react";
import { useEffect, useRef } from "react";
import "./app.css";

// const MemoizedButton = ({ handleClick }) => {
//   console.log("Button rendered");
//   return <button onClick={handleClick}>Click Me</button>;
// };
// // const MemoizedButton = React.memo(({ handleClick }) => {
// //   console.log("Button rendered");
// //   return <button onClick={handleClick}>Click Me</button>;
// // });

// function App() {
//   const [count, setCount] = useState(0);

//   const increment = useCallback(() => {
//     console.log("Increment function called");
//     setCount((prev) => prev + 1);
//   }, []);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <MemoizedButton handleClick={increment} />
//     </div>
//   );
// }
// export default App;

//task1

const App = () => {
  let focusedElement = useRef();

  useEffect(() => {
    if (focusedElement.current) {
      focusedElement.current.style.borderColor = "red";
      setTimeout(() => {
        focusedElement.current.style.borderColor = "";
      }, 1500);
    }
  }, []);

  return (
    <div>
      <h3>Form</h3>
      <form>
        <label>Name: </label>
        <input type="text" ref={focusedElement}></input>
      </form>
    </div>
  );
};
export default App;
