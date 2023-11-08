import React,{useEffect, useState} from 'react'
import userAxiosInstance from '../../utils/userAxiosInstance.js'
import { useLocation,useNavigate  } from 'react-router-dom'; // Import useLocation


const  Places=()=> {
  const [places, setPlaces] = useState([]);
  const [isPlaces, setIsPlaces] = useState(false);
const location=useLocation() // Initialize useLocation
const navigate=useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      // Access the category name from the URL parameter
      const searchParams = new URLSearchParams(location.search);
      const category = searchParams.get('category');

      // Now, you can use the "category" variable in your API request or any other logic
      // Example API request:
      try{

        const res = await userAxiosInstance.get(`/loadPlacesData?category=${category}`);
        const placeDetails=res.data
       
      
        setPlaces(placeDetails)
        setIsPlaces(true)
     
      }catch(error){
console.error('Error fetching data:',error)
      }

      // Update state or perform other actions with the fetched data
    };

    fetchData();
  }, [location.search]); // Add location.search as a dependency to re-run the effect when the URL changes


const directToDetails=(category,place)=>{
  navigate(`/packageDetails?category=${category}&&place=${place}`)
}

  return (
<div className="flex gap-12 bg- userBgColor justify-between p-20">
  {isPlaces ? (
    places.map((place, index) => (
      <div className="relative flex flex-row text-gray-700 bg-white shadow-md w-96 md:w-1/2 rounded-xl bg-clip-border">
        <div className="relative h-40 md:h-auto w-1/2 overflow-hidden shadow-lg rounded-tl-xl rounded-bl-xl bg-clip-border shadow-blue-gray-500/40">
          <img
            src={`http://localhost:5000/images/${place.images[0]}`}
            alt="img-blur-shadow"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-6 w-1/2">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {place.place}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {place.shortDescription}
          </p>
          <div className="p-6 pt-0">
            <button
              className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => directToDetails(place.category, place.place)}
              data-ripple-light="true"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="animate-pulse p-4">
   
      <div className="mt-2 bg-gray-200 h-4 rounded">
        <p className="bg-gray-200 w-1/2 h-4 rounded"></p> Loading...
      </div>
    </div>
  )}
</div>


  )
}



export default Places
