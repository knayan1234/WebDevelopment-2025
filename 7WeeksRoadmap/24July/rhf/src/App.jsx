import "./App.css";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Yup schema for validation
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div>
      <div style={{ width: "auto", border: "5px solid black", padding: "8px" }}>
        Render Count: {renderCountRef.current}
      </div>
      <div style={{ marginTop: "10px" }}>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          // onSubmit={(data) => {
          //   console.log(data);
          // }}
        >
          <input {...register("firstName")} placeholder="First Name"></input>
          <p style={{ color: "red" }}>{errors.firstName?.message}</p>

          <input {...register("lastName")} placeholder="Last Name"></input>
          <p style={{ color: "red" }}>{errors.lastName?.message}</p>

          {/* <input name="firstName" placeholder="First Name"></input>
          <input name="lastName" placeholder="Last Name"></input> */}
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
}

export default App;
