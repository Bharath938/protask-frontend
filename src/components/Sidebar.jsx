import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiList, FiCheckCircle, FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ handleTasksFiltration, setStatusFilter, setPage }) => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
    navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen w-60 p-4 flex flex-col space-y-4">
      <h2 className="text-2xl font-bold mb-6">ProTask</h2>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center space-x-2 hover:bg-gray-700 p-2 rounded ${
            isActive ? "bg-gray-700" : ""
          }`
        }
        onClick={() => {
          setStatusFilter(null);
          setPage(1);
        }}
      >
        <FiHome />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          `flex items-center space-x-2 hover:bg-gray-700 p-2 rounded ${
            isActive ? "bg-gray-700" : ""
          }`
        }
        onClick={() => handleTasksFiltration("Pending, In Progress", 1)}
      >
        <FiList />
        <span>Tasks</span>
      </NavLink>

      <NavLink
        to="/completed"
        className={({ isActive }) =>
          `flex items-center space-x-2 hover:bg-gray-700 p-2 rounded ${
            isActive ? "bg-gray-700" : ""
          }`
        }
        onClick={() => handleTasksFiltration("Completed", 1)}
      >
        <FiCheckCircle />
        <span>Completed</span>
      </NavLink>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded text-left cursor-pointer"
      >
        <FiLogOut />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
