import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const useTasks = () => {
  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState("");

  const userName = auth.user;

  let url = `https://protask-backend-sh82.onrender.com/api/tasks?page=${page}&limit=3`;
  if (statusFilter) {
    url += `&statusFilter=${statusFilter}`;
  }

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setTasks(res.data.tasks);
      setTotalTasks(res.data.totalTasks);
      setFrom(res.data.from);
      setTo(res.data.to);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [page, statusFilter]);

  const handleAddTask = async () => {
    if (!title.trim()) return;
    setButtonLoading("create");
    try {
      await axios.post(
        "https://protask-backend-sh82.onrender.com/api/tasks",
        { title, status, dueDate },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      toast.success("Task created successfully!");
      setTitle("");
      setStatus("");
      setDueDate("");
      fetchTasks();
    } catch (error) {
      toast.error("Error adding task");
    } finally {
      setButtonLoading("");
    }
  };

  const handleUpdateTask = async () => {
    if (!editTitle || !editDueDate || !editStatus) {
      return toast.error("Title, due date & status are required");
    }
    setButtonLoading("update");
    try {
      const res = await axios.put(
        `https://protask-backend-sh82.onrender.com/api/tasks/${editTaskId}`,
        { title: editTitle, dueDate: editDueDate, status: editStatus },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        setIsEditing(false);
        setEditTaskId(null);
        setEditTitle("");
        setEditStatus("");
        setEditDueDate("");
        fetchTasks();
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Error updating task");
    } finally {
      setButtonLoading("");
    }
  };

  const handleDelete = async (id) => {
    setButtonLoading(`delete-${id}`);
    try {
      await axios.delete(
        `https://protask-backend-sh82.onrender.com/api/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      toast.error("Error deleting task");
    } finally {
      setButtonLoading("");
    }
  };

  const handleEditClick = (task) => {
    setEditTitle(task.title);
    setEditStatus(task.status);
    setEditDueDate(task.dueDate || "");
    setIsEditing(true);
    setEditTaskId(task._id);
  };

  const handleTasksFiltration = async (filter, page) => {
    setPage(page);
    setStatusFilter(filter);
    await fetchTasks(filter);
  };

  return {
    userName,
    tasks,
    setTasks,
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
    editTaskId,
    setEditTaskId,
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
    loading,
    buttonLoading,
  };
};

export default useTasks;
