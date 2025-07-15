import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiList,
  FiCheckCircle,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar({
  handleTasksFiltration,
  setStatusFilter,
  setPage,
}) {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
    navigate("/");
  };

  const handleNavClick = (filter, page) => {
    handleTasksFiltration(filter, page);
    setIsOpen(false); // close menu on nav click (mobile)
  };

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between bg-gray-800 p-4 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl"
        >
          <FiMenu />
        </button>
        <h2 className="text-xl text-white font-bold">ProTask</h2>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-800 p-4 flex flex-col transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close button on mobile */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-2xl text-white font-bold">ProTask</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Desktop logo */}
        <h2 className="text-2xl text-white font-bold mb-6 hidden md:block">
          ProTask
        </h2>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            } text-white`
          }
          onClick={() => {
            setStatusFilter(null);
            setPage(1);
            setIsOpen(false);
          }}
        >
          <FiHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            } text-white`
          }
          onClick={() => handleNavClick("Pending, In Progress", 1)}
        >
          <FiList />
          <span>Tasks</span>
        </NavLink>

        <NavLink
          to="/completed"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            } text-white`
          }
          onClick={() => handleNavClick("Completed", 1)}
        >
          <FiCheckCircle />
          <span>Completed</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 text-white mt-auto"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
