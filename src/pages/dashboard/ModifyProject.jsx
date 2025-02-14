import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import axios from "axios";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const ModifyProject = () => {
  const { id } = useParams();
  const [task, setTask] = useState([]);
  const [project, setProject] = useState();
  const [loading, setLoading] = useState(true);
  const [controle, setControle] = useState(true);
  const [taskForm, setTaskForm] = useState({
    title: "",
    idProject: id,
    description: "",
    status: "todo",
    idUser: "",
    due_date: "",
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9094/projects/${id}`
        ); // Replace with your API endpoint
        setProject(response.data);
        setTask(response.data.tasks);
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, controle]);

  // Handle form input changes
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the new task
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:9090/tasks`, taskForm);
      setMessage("Task added successfully!");
      setTaskForm({
        idProject: id,
        title: "",
        description: "",
        status: "todo",
        idUser: "",
        due_date: "",
      });
      // Refresh the project details to show the new task
      if (res.status === 200) {
        toast.success("task added");
        setControle(!controle);
      }
    } catch (error) {
      setMessage("Error adding task.");
      console.error(error);
    }
  };
  const handleTaskDelete = async (id) => {
    try {
      // Make the DELETE request
      const res = await axios.delete(`http://localhost:9090/tasks/${id}`);

      // Check response and refresh
      if (res.status === 200) {
        toast.success("Task deleted successfully");
        setControle((prev) => !prev); // Toggle the controle state to refresh
      }
    } catch (error) {
      setMessage("Error deleting task.");
      console.error("Error deleting task:", error.message);
      toast.error("Failed to delete the task.");
    }
  };

  function extractDate(timestamp) {
    const date = new Date(timestamp); // Parse the timestamp
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  }
  const statusColor = {
    todo: "bg-blue-500",
    in_progress: "bg-yellow-500",
    done: "bg-green-500",
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center p-4 bg-white shadow-sm rounded-md my-4">
        <div className="text-2xl font-bold">Modifier un Projet</div>
        <Breadcrumb item="Modifier un Projet" />
      </div>
      <div className="w-full mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-2">{project?.title}</h1>
        <p className="text-gray-700 mb-4">{project?.description}</p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Les utilisateurs</h2>
          <ul className="flex flex-wrap gap-4">
            {project.members?.map((user) => (
              <li key={user.id} className="mb-1">
                <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  ">
                  <div class="flex flex-row items-center justify-between gap-4 p-3">
                    <img
                      class="w-16 h-16 rounded-full shadow-lg "
                      src="/utilisateur.png"
                      alt="Bonnie image"
                    />
                    <div>
                      <h5 class="mb-1 text-xl font-medium text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </h5>
                      <span class="text-sm text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Tâches</h2>
          <ul className="flex flex-wrap gap-2">
            {task?.map((task) => (
              <li key={task.id} className="mb-4 w-72">
                <div
                  className={`flex flex-col p-2 border rounded-lg p-x shadow-lg bg-gray-50 hover:shadow-xl transition-transform duration-300 cursor-pointer`}
                >
                  <div className="flex justify-between items-center">
                    <div></div>
                    <div
                      onClick={() => handleTaskDelete(task.idTask)}
                      className=" rounded-full p-1 "
                    >
                      <X className="text-slate-500 w-5 h-auto" />
                    </div>
                  </div>
                  {/* Task Header */}
                  <div className="flex items-center justify-between ">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {task?.title}
                    </h3>
                  </div>

                  {/* Task Description */}
                  <p className="text-sm text-gray-600 mb-2">
                    {extractDate(task?.due_date)}
                  </p>
                  <p className="text-sm text-gray-600">{task?.description}</p>

                  {/* Task Footer */}
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Assigned to:{" "}
                      <span className="text-gray-700 font-medium">
                        {task.user?.firstName} {task.user?.lastName}
                      </span>
                    </p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full text-white font-medium ${
                        statusColor[task?.status]
                      }`}
                    >
                      {task?.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-8 bg-white w-full rounded-lg shadow-md p-4 mt-4">
          <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle tâche</h2>
          {message && <p className="mb-4">{message}</p>}
          <form onSubmit={handleTaskSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Titre
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={taskForm.title}
                onChange={handleTaskChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                La description
              </label>
              <textarea
                id="description"
                name="description"
                value={taskForm.description}
                onChange={handleTaskChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-full">
                <label htmlFor="idUser" className="block font-medium mb-1">
                Affecter à l'utilisateur
                </label>
                <select
                  id="idUser"
                  name="idUser"
                  value={taskForm.idUser}
                  onChange={handleTaskChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>
                  Sélectionnez un utilisateur
                  </option>
                  {project.members?.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.firstName} {member.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="due_date" className="block font-medium mb-1">
                Date d'expiration
                </label>
                <input
                  type="datetime-local"
                  id="due_date"
                  name="due_date"
                  value={taskForm.due_date}
                  onChange={handleTaskChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md p-2 font-medium"
            >
              Ajouter une tâche
            </button>
          </form>
        </div>
    </div>
  );
};

export default ModifyProject;
