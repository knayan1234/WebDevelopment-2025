import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import * as Sentry from "@sentry/react";

// Initialize Sentry with the updated tracing integration
Sentry.init({
  dsn: "https://0bcfc350a37294300435a6bb55721c72@o4509882039336960.ingest.us.sentry.io/4509882042089472",
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()], // Updated: No more BrowserTracing from @sentry/tracing
  tracesSampleRate: 1.0, // Keep this for testing
});

// Render the app with ErrorBoundary
const root = createRoot(document.getElementById("root"));
root.render(
  <Sentry.ErrorBoundary fallback={<p>Oops! Something went wrong.</p>}>
    <StrictMode>
      <App />
    </StrictMode>
  </Sentry.ErrorBoundary>
);
