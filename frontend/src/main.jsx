import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CafeProvider, UnitProvider } from "./context/cafeContext.jsx";
import { AuthProvider } from "./auth/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CafeProvider>
          <UnitProvider>
            <App />
          </UnitProvider>
        </CafeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
