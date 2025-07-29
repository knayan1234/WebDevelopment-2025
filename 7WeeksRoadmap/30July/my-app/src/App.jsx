// GPT Version

import { useReducer } from "react";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "add_item":
      return [...state, action.item];
    case "remove_item":
      return state.filter((item) => item.id !== action.id);
    case "update_item":
      return state.map((item) =>
        item.id === action.id ? { ...item, ...action.updates } : item
      );
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={() =>
            dispatch({
              type: "add_item",
              item: { id: 1, name: "Apple", quantity: 1 },
            })
          }
        >
          Add Apple
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "remove_item",
              id: 1,
            })
          }
        >
          Remove Apple
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "update_item",
              id: 1,
              updates: { quantity: 5 },
            })
          }
        >
          Set Apple quantity to 5
        </button>
        <ul>
          {state.map((item) => (
            <li key={item.id}>
              {item.name}: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
