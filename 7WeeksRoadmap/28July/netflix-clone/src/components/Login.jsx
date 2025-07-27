import { useAuth } from "./AuthProvider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Login() {
  const { login } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "70vh",
        width: "100vw",
      }}
    >
      <h2>Login Page</h2>
      <Button variant="contained" onClick={login}>
        Login
      </Button>
    </Box>
  );
}

export default Login;
