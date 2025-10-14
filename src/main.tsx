import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress known non-critical errors in development
if (import.meta.env.DEV) {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args[0]?.toString() || '';
    
    // Suppress Speed Insights errors in dev (expected)
    if (message.includes('_vercel/speed-insights')) return;
    
    // Suppress font loading errors (cache issue, harmless)
    if (message.includes('.woff2')) return;
    
    // Suppress analytics 404s (expected, no backend)
    if (message.includes('/api/analytics')) return;
    
    originalError.apply(console, args);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
