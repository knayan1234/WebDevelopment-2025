// Copied from my React Folder/MiniProject/ProjectThreeWindowResizer

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [windowSize, setWindowSize] = useState(window.outerWidth);

  //window gives a event "resize" that when ever window resizing it is getting fired.
  useEffect(() => {
    console.log("Component mounted");
    const handleResize = () => {
      console.log("Window resized:", window.outerWidth);
      setWindowSize(window.outerWidth);
    };
    window.addEventListener("resize", handleResize);
    // Cleanup on component unmount
    return () => {
      console.log("Component unmounted");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div>
        <h1>🔍 Window Resizer</h1>
        <h4>📐 Live Width: {windowSize}px</h4>
      </div>
    </div>
  );
}

export default App;
