import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const [livres,setLivres] = useState([]);
  const [error,setError] = useState(null);

  useEffect(() => {
    const fetchLivres = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/livres");
        setLivres(res.data);
        console.log(res.data)
      } catch (error) {
        setError(error.message)
        console.error("Error fetching livres:", error);
      }
    };




    
    fetchLivres();
  }, []);
  return (
    <div className='p-8'>    
        {error ? <div className='text-red-500'> error : {error}</div>
        :
        <div className='flex flex-col items-center justify-center gap-4'>
        {livres.map((liv)=>(
            <a href="#" className="px-2 flex flex-col shadow-lg items-center w-1/2 bg-white border border-gray-200 rounded-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full rounded-lg h-96 md:h-auto md:w-48" src="/book.jpg" alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{liv.title}</h5>
                <p className="mb-3 font-normal  text-gray-200">{liv.author}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{liv.description}</p>
                <p className="mb-3 text-xl text-red-200 font-bold">{liv.prix}$</p>
            </div>
            
        </a>    
        ))}
        </div>
        }
    </div>
  )
}

export default Test