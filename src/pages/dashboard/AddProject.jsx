import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select/base";
import Multiselect from "../../components/Multiselect";
import MultiSelector from "../../components/Multiselector";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumb";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
const [tasks, setTasks] = useState([]);
const navigate = useNavigate();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskUser, setTaskUser] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    idAdmin: user?.id, // Assume admin ID is fixed for simplicity
    membersList: [],
    due_date: "",
  });
  useEffect(() => {
    const fetchUserData = async () => {
        setLoading(true)
      const token = localStorage.getItem("authToken");
    
      // Handle missing token early
      if (!token) {
        console.error("No auth token found in local storage.");
        return;
      }

      try {
        // Fetch the current user data
        const userResponse = await axios.get("http://localhost:9091/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userResponse.status === 200) {
          setUser(userResponse.data); // Set current user
          setFormData({
            idAdmin:userResponse.data.id
          })
          
        }

        // Fetch all users data
        const allUsersResponse = await axios.get("http://localhost:9091/api/users/allUsers");

        // Filter out the current user and map the rest
        const userOptions = allUsersResponse.data
          .filter((userItem) => userItem.id !== userResponse.data.id) // Exclude the current user
          .map((userItem) => ({
            label: `${userItem.lastName} ${userItem.firstName}`,
            value: userItem.id,
          }));
          console.log("all",userOptions)
        setUsers(userOptions);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false)
      }
    };

    fetchUserData();
  }, []);
  


  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleChange = (selected) => {
    const selectedValues = selected.map((item) => item.value);
    setSelectedUser(selectedValues);
    console.log(selectedValues);
  };
  
  // Ajouter une tâche à la liste

  const handleAddTask = () => {
    if (taskTitle && taskDescription && taskUser) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: taskTitle,
          description: taskDescription,
          user: taskUser,
          status: "TODO", // Par défaut
        },
      ]);
      setTaskTitle("");
      setTaskDescription("");
      setTaskUser("");
    } else {
      alert("Veuillez remplir tous les champs de la tâche.");
    }
  };

  // Soumettre le projet avec les tâches
  const handleSubmitProject = async() => {
    setLoading(true)
    const projectData = {
      title: formData.title,
      description: formData.description,
      idAdmin:formData.idAdmin,
      membersList:selectedUser
    };
    try {
      const res = await axios.post("http://localhost:9094/project",projectData)
      if(res.status===201){
        toast.success("the project created");
        setLoading(false);
        navigate(`/dashboard/tasks/${res.data.id}`)
        
      }else{
        toast.error("erro when creating the project")
        setLoading(false)
      }
     } catch (error) {
      console.log(error)
      setLoading(false)
     }
    console.log("Projet créé :", projectData);
    // Simuler un appel API ou une logique d'envoi ici
    setTasks([]);
  };

  if(loading){
    return <Loading />
  }
  return (
    <>
    <div className="flex flex-row justify-between items-center p-4 bg-white shadow-sm rounded-md my-4">
        <div className="text-2xl font-bold"> Créer un Projet</div>
        <Breadcrumb item=" Créer un Projet"/>
      </div>
    <div className="min-h-screen bg-gray-50 p-6 rounded-lg">
       
     
      {/* Formulaire de Projet */}
      <form
        onSubmit={handleSubmitProject}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Nouveau Projet
        </h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Nom du Projet</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Nom du projet"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChanges}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Description</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Description du projet"
            rows="4"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChanges}
          ></textarea>
        </div>
        <label
          for="small"
          class="block mb-2 text-sm font-medium text-gray-900 "
        >
          Select the users
        </label>
        <MultiSelector
      categories={users}
      onChange={handleChange}
    />
       
      </form>

      

      {/* Liste des Tâches
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Ajouter une Tâche
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-600 mb-2">
              Titre de la Tâche
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Titre"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Description</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Assigné à</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Nom de l'utilisateur"
              value={taskUser}
              onChange={(e) => setTaskUser(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleAddTask}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ajouter Tâche
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tâches</h2>
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-500">
                    Assigné à: {task.user}
                  </p>
                </div>
                <span className="text-xs font-semibold text-blue-600 uppercase">
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucune tâche ajoutée.</p>
        )}
      </div>

      {/* Bouton Soumettre */}
      <button
        onClick={handleSubmitProject}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Soumettre le Projet
      </button>
    </div></>
  )
}

export default AddProject