// import React, { useState } from "react";

// function App() {
//   const [output, setOutput] = useState("");

//   function debounce(fn, delay) {
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => fn(...args), delay);
//     };
//   }

//   const debounceReturned = debounce((text) => {
//     setOutput(text);
//   }, 1000);

//   const handleChange = (e) => {
//     debounceReturned(e.target.value);
//   };

//   return (
//     <>
//       <div>
//         Write Text:
//         <input onChange={handleChange} />
//       </div>
//       <p>Debounce Text: {output}</p>
//     </>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";

// function App() {
//   const [output, setOutput] = useState("");
//   const [debouncedValue, setDebouncedValue] = useState("");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedValue(output);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [output]);

//   return (
//     <>
//       <div>
//         Write Text:
//         <input onChange={(e) => setOutput(e.target.value)} />
//       </div>
//       <p>Debounce Text: {debouncedValue}</p>
//     </>
//   );
// }

// export default App;

import React, { useState, useRef } from "react";

function App() {
  const [output, setOutput] = useState("");
  const waitingRef = useRef(false);
  const lastArgsRef = useRef(null);

  function MainWork(value) {
    setOutput(value);
  }

  function doSomeMagic(functionToWorkOn, delay = 1000) {
    return function (...args) {
      lastArgsRef.current = args;
      if (!waitingRef.current) {
        functionToWorkOn(...args);
        waitingRef.current = true;
        setTimeout(() => {
          waitingRef.current = false;
          if (lastArgsRef.current) {
            functionToWorkOn(...lastArgsRef.current);
            lastArgsRef.current = null;
          }
        }, delay);
      }
    };
  }

  const betterFunction = doSomeMagic(MainWork, 1000);

  function handleChange(e) {
    betterFunction(e.target.value);
  }
  return (
    <>
      <div>
        Write Text:
        <input onChange={handleChange} />
      </div>
      <p>Throttle Text: {output}</p>
    </>
  );
}

export default App;
