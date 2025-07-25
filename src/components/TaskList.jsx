import React, { useState, useEffect } from "react";

export default function TaskList({
  tasks,
  setTasks,
  handleEditClick,
  handleDelete,
  buttonLoading,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  return (
    <div>
      <SearchBar query={searchQuery} handleSearch={handleSearch} />

      {filteredTasks?.length ? (
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="flex flex-col md:flex-row md:justify-between md:items-center bg-[#475569] p-4 rounded-md text-white"
            >
              <div className="mb-2 md:mb-0">
                <h3 className="font-bold break-words">{task.title}</h3>
                <p>Status: {task.status}</p>
                <p>Due: {task.dueDate}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(task)}
                  className={`text-blue-400 hover:text-blue-600 transition ${
                    buttonLoading?.startsWith("delete-")
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  disabled={buttonLoading?.startsWith("delete-")}
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className={`text-red-400 hover:text-red-600 transition ${
                    buttonLoading === `delete-${task._id}`
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  disabled={buttonLoading === `delete-${task._id}`}
                >
                  {buttonLoading === `delete-${task._id}`
                    ? "Deleting..."
                    : "🗑️ Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-xl md:text-2xl text-white text-center py-8">
          No Tasks Found!
        </h2>
      )}
    </div>
  );
}

function SearchBar({ query, handleSearch }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="flex-1 px-4 py-2 mb-2 md:mb-0 rounded-lg bg-[#334155] border border-gray-600 placeholder-gray-400 text-white"
      />
      <button
        onClick={() => handleSearch("")}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer w-full md:w-auto"
      >
        Clear
      </button>
    </div>
  );
}
