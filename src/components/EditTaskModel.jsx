import React from "react";

export default function EditTaskModal({
  isEditing,
  setIsEditing,
  editDueDate,
  editStatus,
  editTitle,
  setEditDueDate,
  setEditStatus,
  setEditTitle,
  handleUpdateTask,
  buttonLoading,
}) {
  if (!isEditing) return null;

  const isDisabled =
    !editTitle.trim() ||
    !editDueDate ||
    !editStatus ||
    buttonLoading === "update";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-6">Edit Task</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setIsEditing(false)}
            className="px-5 py-2 cursor-pointer rounded-lg border border-gray-600 hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            disabled={isDisabled}
            onClick={handleUpdateTask}
            className={`px-5 py-2 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 transition ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {buttonLoading === "update" ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
