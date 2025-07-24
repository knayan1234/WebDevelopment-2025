// import "./App.css";
import { useState } from "react";

function useMode() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => setDarkMode((prev) => !prev);
  return { toggleMode, darkMode };
}

function useLocalStorage() {
  const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving", error);
    }
  };
  return { saveToLocalStorage };
}

function useFetchLocalStorage() {
  const fetchFromLocalStorage = (key) => {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      console.error("Error fetching", error);
      return null;
    }
  };
  return { fetchFromLocalStorage };
}

function App() {
  const { darkMode, toggleMode } = useMode();
  const { saveToLocalStorage } = useLocalStorage();
  const { fetchFromLocalStorage } = useFetchLocalStorage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving:", formData);
    saveToLocalStorage("userData", formData);
    alert("Data saved to localStorage!");
  };

  return (
    <div style={{ boxSizing: "border-box", overflow: "hidden" }}>
      <div
        style={{
          backgroundColor: darkMode ? "#121212" : "#fff",
          color: darkMode ? "#fff" : "#000",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Navbar
          toggleMode={toggleMode}
          darkMode={darkMode}
          fetchFromLocalStorage={fetchFromLocalStorage}
        />

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ flexDirection: "row" }}>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div style={{ flexDirection: "row" }}>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div style={{ flexDirection: "row" }}>
            <label>Mobile: </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;

function Navbar({ toggleMode, darkMode, fetchFromLocalStorage }) {
  const fetchLocalStorageHandler = () => {
    const data = fetchFromLocalStorage("userData");
    alert(`Fetched: ${JSON.stringify(data)}`);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "10%",
        paddingRight: "5%",
        gap: "10px",
      }}
    >
      <button onClick={toggleMode}>
        {darkMode ? "Light mode" : "Dark Mode"}
      </button>
      <button onClick={fetchLocalStorageHandler}>Fetch</button>
    </div>
  );
}
