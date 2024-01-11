import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import QuizProvider from "./context/context.tsx";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
      <Analytics />
    </QuizProvider>
  </React.StrictMode>
);
