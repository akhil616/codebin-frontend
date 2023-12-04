import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PasteContextProvider } from "./context/PasteContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { UserPasteContextProvider } from "./context/UserPasteContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <PasteContextProvider>
      <UserPasteContextProvider>
        <App />
      </UserPasteContextProvider>
    </PasteContextProvider>
  </AuthContextProvider>
);
