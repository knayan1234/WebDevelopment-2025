import { useTheme } from "./ThemeContext";

const ChildThree = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      style={{
        background: theme === "dark" ? "black" : "beige",
        color: theme === "dark" ? "#fff" : "#000",
        padding: "10px",
        display: "flex",
        width: "300px",
        height: "300px",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid red",
      }}
    >
      <button onClick={toggleTheme}>
        Toggle to {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
};
export default ChildThree;
