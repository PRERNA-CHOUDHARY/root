/**
 * @fileoverview The main file that renders the React component.
 */

// Import React and ReactDOM.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Import the component and context.
import App from "./App.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";

// Import the CSS files.
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// Render the component.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={600}
          closeOnClick
          pauseOnHover={true}
        />
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
