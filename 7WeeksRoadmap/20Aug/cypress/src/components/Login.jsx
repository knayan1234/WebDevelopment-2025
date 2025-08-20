import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim(); // Trim whitespace
    const trimmedPassword = password.trim();
    console.log("Submitting with:", { trimmedEmail, trimmedPassword }); // Debug in console

    if (
      trimmedEmail === "user@example.com" &&
      trimmedPassword === "correctpassword"
    ) {
      console.log("Auth success - setting token");
      localStorage.setItem("token", "fake-jwt-token");
      console.log("Navigating to /dashboard");
      navigate("/dashboard", { replace: true }); // Use replace for cleaner history
    } else {
      console.log("Auth failed");
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        noValidate // <–– disallow native validation pop-ups
        data-testid="login-form" // optional, helpful in tests
      >
        <input
          data-testid="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          data-testid="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button data-testid="login-submit" type="submit">
          Login
        </button>
      </form>
      {error && <p data-testid="login-error">{error}</p>}
    </div>
  );
}

export default Login;
