import { useState } from "react";

const API_BASE = "http://localhost:5000/api";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [secret, setSecret] = useState("");

  const signup = async () => {
    setMsg("");
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) setMsg("Signup OK. Now login.");
      else setMsg(data.error || "Signup failed");
    } catch {
      setMsg("Network error (signup)");
    }
  };

  const login = async () => {
    setMsg("");
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("jwtToken", data.token);
        setMsg(`Login OK. Welcome ${data?.user?.username || ""}`);
      } else {
        setMsg(data.error || "Login failed");
      }
    } catch {
      setMsg("Network error (login)");
    }
  };

  const getSecret = async () => {
    setMsg("");
    setSecret("");
    const token = localStorage.getItem("jwtToken");
    if (!token) return setMsg("No token. Please login first.");
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setSecret(data.protectedData || "(no data)");
        setMsg("Fetched protected data.");
      } else {
        setMsg(data.error || "Unauthorized");
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("jwtToken");
        }
      }
    } catch {
      setMsg("Network error (profile)");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setMsg("Logged out. Token removed.");
    setSecret("");
  };

  return (
    <div
      style={{ maxWidth: 420, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h2>JWT Basics Demo</h2>

      <div style={{ display: "grid", gap: 8 }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 8 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 8 }}
        />

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={signup}>Sign Up</button>
          <button onClick={login}>Log In</button>
          <button onClick={getSecret}>Get Protected</button>
        </div>

        <button onClick={logout} style={{ width: "100%" }}>
          Log Out
        </button>
      </div>

      {msg && (
        <div style={{ marginTop: 16, padding: 8, background: "#f0f0f0" }}>
          {msg}
        </div>
      )}

      {secret && (
        <div style={{ marginTop: 16, padding: 8, background: "#e8ffe8" }}>
          <strong>Protected:</strong> {secret}
        </div>
      )}
    </div>
  );
}
