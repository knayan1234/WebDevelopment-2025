import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";

// import Home from "./components/home";
// import About from "./components/About";
// import Dashboard from "./components/Dashboard";
// import Courses from "./components/Courses";
// import Videos from "./components/Videos";
// import NotFound from "./components/NotFound";
// import Login from "./components/Login";

//lazy
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Courses = lazy(() => import("./components/Courses"));
const Videos = lazy(() => import("./components/Videos"));
const NotFound = lazy(() => import("./components/NotFound"));
const Login = lazy(() => import("./components/Login"));

import { Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import { useAuth } from "./components/AuthContext";

function App() {
  // //1.Normal way
  // const isLoggedIn = () => localStorage.getItem("isLogin") === "true";
  // const PrivateRoute = ({ children }) => {
  //   return isLoggedIn() ? children : <Navigate to="/login" />;
  // };

  // 2. Context one
  const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              >
                <Route path="courses" element={<Courses />} />
                <Route path="videos/:videoId" element={<Videos />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
