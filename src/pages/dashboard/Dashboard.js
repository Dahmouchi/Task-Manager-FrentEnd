import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayouts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TaskList from "../../components/Task";
import Loading from "../../components/Loading";
import { LayoutDashboard } from "lucide-react";
const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("No auth token found in local storage.");
          return;
        }
        setLoading(true);
        const res = await axios.get("http://localhost:9091/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });
        const response = await axios.get(
          `http://localhost:9094/users/${res.data.id}/projects`
        );
        console.log(response.data);
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle project selection
  const handleProjectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedProject(selectedId);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="bg-white shadow-md rounded-md px-4 py-2 mb-5 flex flex-row justify-between items-center">
        <div className="text-xl font-semibold flex gap-2 items-center">
          <LayoutDashboard />
          Dashboard
        </div>
        <div>
          <label
            htmlFor="project-dropdown"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Sélectionnez un projet :
          </label>
          <select
            id="project-dropdown"
            onChange={handleProjectChange}
            value={selectedProject || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value="" disabled>
              -- Sélectionnez un projet : --
            </option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedProject ? (
        <TaskList projectId={selectedProject} />
      ) : (
        <div className="flex flex-col items-center justify-center shadow-md min-h-[70vh] bg-gray-50 p-6">
          <div className="text-center">
            <img
              src="/hero.png" // Replace with your actual image path
              alt="Welcome"
              className="w-40 h-auto mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Bienvenue dans le gestionnaire de tâches
            </h1>
            <p className="text-lg text-gray-600">
            Veuillez sélectionner un projet dans le menu supérieur pour commencer à gérer efficacement vos tâches.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
