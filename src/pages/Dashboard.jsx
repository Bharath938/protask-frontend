import React from "react";
import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Pagination from "../components/Pagination";
import useTasks from "../hooks/useTasks";
import EditTaskModal from "../components/EditTaskModel";
import Loader from "../components/Loader";

const Dashboard = () => {
  const {
    userName,
    tasks,
    totalTasks,
    page,
    setPage,
    totalPages,
    from,
    to,
    title,
    status,
    dueDate,
    setTitle,
    setStatus,
    setDueDate,
    isEditing,
    setIsEditing,
    handleAddTask,
    handleUpdateTask,
    handleEditClick,
    handleDelete,
    statusFilter,
    setStatusFilter,
    handleTasksFiltration,
    editDueDate,
    editStatus,
    editTitle,
    setEditDueDate,
    setEditStatus,
    setEditTitle,
    setTasks,
    loading,
    buttonLoading,
  } = useTasks();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white relative">
      {loading && <Loader />}
      <div className="w-64 bg-gray-800 p-4 flex flex-col">
        <Sidebar
          handleTasksFiltration={handleTasksFiltration}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setPage={setPage}
        />
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6">Protask-Manager</h1>
          <span>Hi, {userName}</span>
        </div>

        <TaskForm
          title={title}
          status={status}
          dueDate={dueDate}
          setTitle={setTitle}
          setStatus={setStatus}
          setDueDate={setDueDate}
          isEditing={isEditing}
          handleAddTask={handleAddTask}
          handleUpdateTask={handleUpdateTask}
          buttonLoading={buttonLoading}
        />

        <TaskList
          tasks={tasks}
          handleEditClick={handleEditClick}
          handleDelete={handleDelete}
          setTasks={setTasks}
          buttonLoading={buttonLoading}
        />

        <EditTaskModal
          editDueDate={editDueDate}
          editStatus={editStatus}
          editTitle={editTitle}
          setEditDueDate={setEditDueDate}
          setEditStatus={setEditStatus}
          setEditTitle={setEditTitle}
          handleUpdateTask={handleUpdateTask}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          buttonLoading={buttonLoading}
        />

        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          from={from}
          to={to}
          totalTasks={totalTasks}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
