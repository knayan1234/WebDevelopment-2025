import { useState } from "react";
import "./App.css";

function App() {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    bday: "",
    tel: "",
  });

  const handleChange = (e) => {
    console.log("e.target", e.target);
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = () => {
    console.log(formDetails);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formDetails.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formDetails.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            name="bday"
            value={formDetails.bday}
            onChange={handleChange}
          />
        </label>
        <label>
          Telephone:
          <input
            type="tel"
            name="tel"
            value={formDetails.tel}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
