import React from "react";

const TaskForm = ({
  title,
  status,
  dueDate,
  setTitle,
  setStatus,
  setDueDate,
  isEditing,
  handleAddTask,
  handleUpdateTask,
  buttonLoading,
}) => {
  const isDisabled =
    !title.trim() || !status || !dueDate || buttonLoading !== null;

  return (
    <div className="bg-[#1e293b] p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? "Update Task" : "Create Task"}
      </h2>

      <div className="flex flex-col sm:flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full md:flex-1 px-4 py-2 rounded-lg bg-[#334155] border border-gray-600 placeholder-gray-400 text-white"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full md:w-auto px-4 py-2 rounded-lg bg-[#334155] border border-gray-600 text-white cursor-pointer"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full md:w-48 px-4 py-2 rounded-lg bg-[#334155] border border-gray-600 text-white cursor-pointer"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          disabled={isDisabled}
          onClick={isEditing ? handleUpdateTask : handleAddTask}
          className={`w-full md:w-32 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition ${
            isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {buttonLoading === "create"
            ? "Creating..."
            : buttonLoading === "update"
            ? "Updating..."
            : isEditing
            ? "Update"
            : "Create"}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
