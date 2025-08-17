const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = 5000;
const JWT_SECRET = "your-super-secret-jwt-key"; // In production, use environment variable

// Middleware
app.use(cors());
app.use(express.json());

// In-memory user storage (replace with database in production)
let users = [];

// Helper function to find user
const findUser = (username) => users.find((user) => user.username === username);

// JWT verification middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Routes

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    // Check if user already exists
    if (findUser(username)) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
    };

    users.push(newUser);

    res.status(201).json({
      message: "User created successfully",
      userId: newUser.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during signup" });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    // Find user
    const user = findUser(username);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// Protected route example
app.get("/api/profile", authenticateToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}!`,
    user: req.user,
    protectedData: "This is protected information that requires authentication",
  });
});

// Get all users (for testing - remove in production)
app.get("/api/users", (req, res) => {
  const safeUsers = users.map((user) => ({
    id: user.id,
    username: user.username,
  }));
  res.json(safeUsers);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
