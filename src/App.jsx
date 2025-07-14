import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
