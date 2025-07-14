import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import App from "../App";
import PublicRoute from "../components/PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard filter="all" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Dashboard filter="In Progress" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/completed"
        element={
          <ProtectedRoute>
            <Dashboard filter="Completed" />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
