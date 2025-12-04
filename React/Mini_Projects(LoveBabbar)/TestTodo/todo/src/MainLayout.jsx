import { useState } from "react";

export default function MainLayout() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSend() {
    if (!value.trim()) return;
    setItems((prev) => [...prev, value]);
    setValue("");
  }

  function removeItem(item) {
    setItems((prev) => prev.filter((prevItem) => prevItem !== item));
  }

  return (
    <>
      <div>
        <input onChange={(e) => handleChange(e)} value={value} />
        <button onClick={handleSend}>Add</button>
      </div>
      <hr />
      <div>
        <p>To do list:</p>
      </div>
      {items ? (
        items.map((item) => {
          return (
            <div
              key={item}
              style={{
                border: "1px solid black",
                padding: "5px",
                margin: "5px",
                width: "50%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {item}
              <button onClick={() => removeItem(item)}> Delete</button>
            </div>
          );
        })
      ) : (
        <div>None</div>
      )}
    </>
  );
}
