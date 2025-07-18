import React from "react";

function App() {
  //   const items = [
  //     { id: 1, fruit: "Apple" },
  //     { id: 2, fruit: "Banana" },
  //     { id: 3, fruit: "Cherry" },
  //   ];

  //   return (
  //     <ul>
  //       {items.map((item) => {
  //         console.log("Rendering:", item.fruit);
  //         return <li key={item.id}>{item.fruit}</li>;
  //       })}
  //     </ul>
  //   );
  // }
  const items = ["Apple", "Banana", "Cherry"];

  return (
    <ul>
      {items.map((fruit, index) => {
        console.log("Rendering:", fruit);
        return <li key={index}>{fruit}</li>;
      })}
    </ul>
  );
}

export default App;
