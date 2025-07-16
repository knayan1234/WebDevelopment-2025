import "./App.css";
import { useRef } from "react";

function App() {
  const nameRef = useRef();
  const emailRef = useRef();
  const bdayRef = useRef();
  const telRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      bday: bdayRef.current.value,
      tel: telRef.current.value
    };
    console.log(formData);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label>
          Name:
          <input type="text" name="name" ref={nameRef} />
        </label>
        <label>
          Email:
          <input type="email" name="email" ref={emailRef} />
        </label>
        <label>
          Birthday:
          <input type="date" name="bday" ref={bdayRef} />
        </label>
        <label>
          Telephone:
          <input type="tel" name="tel" ref={telRef} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
