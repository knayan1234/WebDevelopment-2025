import { BrowserRouter, Routes, Route } from "react-router";
import { useAuth } from "../common/contexts/AuthProvider";
import { AuthProvider } from "../common/contexts/AuthProvider";
import { CartProvider } from "../common/contexts/CartContext";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NotFound from "../components/NotFound";
import Login from "../components/Login";
import Main from "../components/Main";
function Router() {
  const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to="/main" />;
  };

  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route index path="/" element={<Login />} />
              <Route
                path="main"
                element={
                  <PrivateRoute>
                    <Main />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default Router;
