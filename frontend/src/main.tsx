import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router>
        <AuthContext>
          <App />
        </AuthContext>
      </Router>
    </React.StrictMode>
  );
}
