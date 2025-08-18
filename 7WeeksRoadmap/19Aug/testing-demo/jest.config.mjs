// jest.config.mjs (ESM style)
const config = {
  testEnvironment: "jsdom", // Simulates browser for React
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"], // If you have a setup file (create if missing)
  verbose: true, // Detailed output
  // Add for ESM and React support
  extensionsToTreatAsEsm: [".js", ".jsx"], // Treat these as ESM
  // If using Babel for JSX (recommended for Vite), add transform (install babel-jest if needed)
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};

export default config;
