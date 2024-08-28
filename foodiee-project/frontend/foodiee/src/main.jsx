import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StoreContextProvider from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreContextProvider>      {/* context provider wrapped around all the components to tranfer data from one to another component */}
      <App />
    </StoreContextProvider>
  </StrictMode>
);
