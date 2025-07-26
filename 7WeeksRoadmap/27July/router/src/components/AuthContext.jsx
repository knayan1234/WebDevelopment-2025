import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// 1. Create Context
const AuthContext = createContext();

// 2. Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLogin", "true");
    navigate("/dashboard");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLogin");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to use this
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
