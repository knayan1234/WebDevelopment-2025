import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/home";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import Videos from "./components/Videos";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="courses" element={<Courses />} />
              <Route path="videos/:videoId" element={<Videos />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
