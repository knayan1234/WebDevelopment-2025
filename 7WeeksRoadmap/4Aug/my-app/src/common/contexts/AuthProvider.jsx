import { createContext, useContext, useState } from "react";

// 1. Create Context
const AuthContext = createContext(null);

// 2. Provider Component
export const AuthProvider = ({ children }) => {
  // useEffect(() => {
  //   sessionStorage.removeItem("isLogin");
  // }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLogin", "true");
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
