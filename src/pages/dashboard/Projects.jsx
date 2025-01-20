import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select/base";
import Multiselect from "../../components/Multiselect";
import MultiSelector from "../../components/Multiselector";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumb";
import Loading from "../../components/Loading";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        // Fetch the current user data
        const projectsres = await axios.get("http://localhost:9094/projects");
        if(projectsres.status === 200){
          console.log(projectsres.data)
          setProjects(projectsres.data)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false)
      }
    };
    fetchUserData();
  }, []);
  function extractDate(timestamp) {
    const date = new Date(timestamp); // Parse the timestamp
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  }
  if(loading){
    return <Loading />
  }
  return (
    <div>
      
      <div className="flex flex-row justify-between items-center p-4 bg-white shadow-sm rounded-md my-4">
        <div className="text-2xl font-bold">Projects</div>
        <Breadcrumb item="Project"/>
      </div>
    <div>
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Le nom de projet
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Date de création
                </th>
                <th scope="col" className="px-6 py-3">
                    Nombre d'utilisateur
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
        {
            projects.map((pr)=>(
              <tr className="bg-white border-b  hover:bg-gray-50 " key={pr.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {pr?.title}
              </th>
              <td className="px-6 py-4">
                  {pr?.description}
              </td>
              <td className="px-6 py-4">
                  {extractDate(pr?.created_at)}
              </td>
              <td className="px-6 py-4">
                  {pr?.membersList?.length}
              </td>
              <td className="px-6 py-4 text-right">
                  <a href={`/dashboard/tasks/${pr.id}`} className="font-medium text-blue-600  hover:underline">Edit</a>
              </td>
          </tr>
            ))
           } 
        </tbody>
    </table>
</div>

    </div>

    </div>
  );
};

export default Projects;
