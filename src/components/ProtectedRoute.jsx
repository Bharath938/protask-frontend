import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!auth.user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
