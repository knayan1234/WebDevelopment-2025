import { ThemeProvider } from "./components/ThemeContext";
import ChildOne from "./components/ChildOne";

function App() {
  return (
    <>
      <div>
        <ThemeProvider>
          <ChildOne />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
