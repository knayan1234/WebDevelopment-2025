import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [windowSize, setWindowSize] = useState(window.outerWidth);

  //window give a event "resize" 
   useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.outerWidth);
    };
    window.addEventListener("resize", handleResize);
    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div className="app-container">
      <div className="resizer-box">
        <h1>🔍 Window Resizer</h1>
          <h4>📐 Live Width: {windowSize}px</h4>
      </div>
    </div>
  );
}

export default App;


  //   <button onClick={clickHandler}>Get Current Width</button>
  //    <h4>📐 Width: {windowSize}px</h4> 

  //   const clickHandler = () => { setWindowSize(window.outerWidth);};

