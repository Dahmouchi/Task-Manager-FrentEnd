import React, { useState,useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayouts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskList from '../../components/Task';
const Dashboard = () => {
  const navigate = useNavigate();
  const [livres,setLivres] = useState([]);
  {/* useEffect(() => {
    const fetchLivres = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/livres");
        setLivres(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching livres:", error);
      }
    };

    fetchLivres();
  }, []);*/}
  return (
         <div>
           <TaskList />
           <button onClick={()=>console.log(localStorage.getItem("authToken"))}>token</button>
         </div>

        
  )
}

export default Dashboard