import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useAuth } from "../common/contexts/AuthProvider";
import { useNavigate } from "react-router";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLoginClick = () => {
    login();
    navigate("/main");
  };
  return (
    <div>
      <Paper
        sx={{
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          background: "linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%)",
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "#3A1C71" }}
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </Paper>
    </div>
  );
};
export default Login;
