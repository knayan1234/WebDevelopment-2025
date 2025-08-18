import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // For React DOM simulation
    globals: true, // Allows describe/it/expect without imports
    setupFiles: "./setupTests.js", // Loads jest-dom extensions
  },
});
