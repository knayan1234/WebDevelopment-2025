import { useState } from "react";
import "./App.css";
import { options } from "./option";

function App() {
  const [country, setCountry] = useState(null);

  const cities = options.find((opt) => opt.name === country)?.cities || [];
  return (
    <>
      <select
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      >
        {options.map((i) => {
          return <option>{i.name}</option>;
        })}
      </select>
      <select>
        {cities.map((i) => {
          return <option>{i}</option>;
        })}
      </select>
    </>
  );
}

export default App;
