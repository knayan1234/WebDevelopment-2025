import "./App.css";
import useCounterStore from "./counterStore";

const App = () => {
  const { count, increment, decrement } = useCounterStore();
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <button onClick={increment}>+</button>
        <p>
          Count :{" "}
          <span
            style={{
              color: "orange",
              border: "1px solid orange",
              padding: "10px",
            }}
          >
            {count}
          </span>{" "}
        </p>
        <button onClick={decrement}>-</button>
      </div>
    </>
  );
};
export default App;

// Redux

// import { useDispatch, useSelector } from "react-redux";
// import "./App.css";
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   reset,
// } from "./features/counter/counterSlice";

// function App() {
//   const count = useSelector((state) => state.counter.value);
//   const dispatch = useDispatch();

//   const handleIncrement = () => {
//     dispatch(increment());
//   };
//   const handleDecrement = () => {
//     dispatch(decrement());
//   };
//   const handleReset = () => {
//     dispatch(reset());
//   };
//   const handleIncByAmount = () => {
//     dispatch(incrementByAmount(5));
//   };

//   return (
//     <>
//       <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//         <button onClick={handleIncrement}>+</button>
//         <p>
//           Count :{" "}
//           <span
//             style={{
//               color: "orange",
//               border: "1px solid orange",
//               padding: "10px",
//             }}
//           >
//             {count}
//           </span>{" "}
//         </p>
//         <button onClick={handleDecrement}>-</button>
//         <button onClick={handleReset}>Reset</button>
//         <button onClick={handleIncByAmount}>Increase by amount </button>
//       </div>
//     </>
//   );
// }

// export default App;
