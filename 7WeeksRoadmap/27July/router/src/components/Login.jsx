// import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const { login } = useAuth();

  //   const navigate = useNavigate();

  //   const handleLogin = () => {
  //     localStorage.setItem("isLogin", "true");
  //     navigate("/dashboard");
  //   };

  return (
    <div>
      <h2>Login Page</h2>
      {/* <button onClick={handleLogin}>Login</button> */}
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
