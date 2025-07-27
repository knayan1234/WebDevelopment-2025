import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Movies from "./components/Movies";
import WebShows from "./components/WebShows";
import { movieData } from "./data.js";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Navigate to="/homepage" replace /> : children;
  };

  return (
    <>
      <Box>
        <BrowserRouter>
          <AuthProvider>
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/homepage"
                element={
                  <PrivateRoute>
                    <>
                      <Homepage movieData={movieData} searchTerm={searchTerm} />
                    </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/movies"
                element={
                  <PrivateRoute>
                    <>
                      <Movies movieData={movieData} searchTerm={searchTerm} />
                    </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/webshows"
                element={
                  <PrivateRoute>
                    <>
                      <WebShows movieData={movieData} searchTerm={searchTerm} />
                    </>
                  </PrivateRoute>
                }
              />
              {/* Default route: redirect to /login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
