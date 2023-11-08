import React ,{useEffect, useState} from 'react'
import userAxiosInstance from '../../utils/userAxiosInstance.js'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router


function PackagesAndDestination() {
  const [packages,setPackages]=useState([])
  const [dataFetched, setDataFetched] = useState(false);
  const navigate=useNavigate()
  useEffect(()=>{

    const fetchData=async()=>{
      try{

         const res= await userAxiosInstance.get('/packages')
         setPackages(res.data.packages)
         setDataFetched(true); // Mark data as fetched
      }catch(error){
        console.error('Error fetching data: ', error);
      }
    }
    fetchData()
  },[])


 const toPlaceswithCatName=(category)=>{

navigate(`/places?category=${category}`)

 }


  return  (
<div className="flex flex-wrap bg- userBgColor justify-between px-20">
      {dataFetched ? (
        packages
          .filter((pakge, index, self) => {
            // Filter out duplicates by checking if the category is unique
            return (
              self.findIndex((p) => p.category.toLowerCase() === pakge.category.toLowerCase()) === index
            );
          })
          .map((pakge, index) => (
            <div
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-40 mb-40 w-80 "
              key={index}
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-80 h-60"
                  src={`http://localhost:5000/images/${pakge.categoryImages}`}
                  alt={`category images ${index}`}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {pakge.category}
                  </h5>
                </a>
                <a
                  href=""
                  onClick={() => toPlaceswithCatName(pakge.category)} // Pass the category to the function
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

    
  
    
  


export default PackagesAndDestination
