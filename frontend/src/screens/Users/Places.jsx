import React,{useEffect, useState} from 'react'
import userAxiosInstance from '../../utils/userAxiosInstance.js'
import { useLocation,useNavigate  } from 'react-router-dom'; // Import useLocation

import { useSelector } from "react-redux";



const  Places=()=> {
  const [places, setPlaces] = useState([]);
  const [isPlaces, setIsPlaces] = useState(false);
const location=useLocation() // Initialize useLocation
const navigate=useNavigate()

const searchParams = new URLSearchParams(location.search);
const category = searchParams.get('category');
const packageId= searchParams.get('packageId')
const userInfo = useSelector((state) => state.auth);
 // State to keep track of liked places
 const [likedPlaces, setLikedPlaces] = useState([]);
const toggleLike = async (placeId) => {
  try {
    let res;
    if (likedPlaces.includes(placeId)) {
      // If it was previously liked, make a DELETE request to remove it from the wishlist
      res = await userAxiosInstance.delete(`/removeFromWishlist?packageId=${placeId}`, userInfo);
      setLikedPlaces(likedPlaces.filter((id) => id !== placeId));
    } else {
      // If it was not previously liked, make a POST request to add it to the wishlist
      res = await userAxiosInstance.post(`/addToWishlist?packageId=${placeId}`, userInfo);
      setLikedPlaces([...likedPlaces, placeId]);
    }

    console.log(res.data);
  } catch (error) {
    // Handle error
    console.error('Error updating wishlist:', error);
  }
};


  useEffect(() => {
    const fetchData = async () => {
      try{
        const wishlistRes = await userAxiosInstance.get('/getWishlist', userInfo);
        const userWishlistArray = wishlistRes.data.userWishlist || [];
        const packageIds = userWishlistArray.map((item) => item.packageId);
        setLikedPlaces(packageIds);
        

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
  }, [category]); // Add location.search as a dependency to re-run the effect when the URL changes


const directToDetails=(category,place)=>{
  navigate(`/packageDetails?category=${category}&&place=${place}`)
}

// WISHLIST
// const [liked, setLiked] = useState(false);

// const [wishlist,setWishlist]=useState(null)




  // const linkTo = liked ? '/liked-route' : '/unliked-route';

  return (
   

<div>
{/* Banner */}
<div className="relative h-60 md:h-60 overflow-hidden shadow-md  bg-clip-border shadow-blue-gray-500/40">
 
  {/* Image and Text Container */}
  <div className="absolute top-0 left-0 w-full h-full">
    <img
      src="public/travelImage5.jpg"
      alt="banner"
      className="object-cover w-full h-60 hover:opacity-80 transition-opacity duration-300 ease-in-out "
    />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
    <h1 className="text-4xl font-bold animate__animated animate__fadeIn">
  "Adventure awaits."
</h1>
<p className="text-lg mt-2 animate__animated animate__fadeIn">
  "Explore the world and find yourself."
</p>

    </div>
  </div>
</div>



<div className="flex flex-wrap gap-12 bg-userBgColor justify-flow p-20 w-full">
  {isPlaces ? (
    places.map((place, index) => (
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full md:w-1/2 lg:w-1/4 rounded-xl mb-12 mt-20" key={index}>
        <div className="relative h-40 md:h-60 overflow-hidden shadow-lg rounded-t-xl bg-clip-border shadow-blue-gray-500/40">
          <img
            src={`http://localhost:5000/images/${place.images[0]}`}
            alt="img-blur-shadow"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {place.place}
            </h5>
            <p className="block font-sans text-xs antialiased font-light leading-relaxed text-inherit text">
              {place.shortDescription}
            </p>
          </div>
          <div className='flex justify-between'>
            <button
              className="select-none rounded-lg bg-pink-500 py-3 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => directToDetails(place.category, place.place)}
              data-ripple-light="true"
            >
              Read More
            </button>
            <div className="p-6 pt-0">
              {/* Wishlist */}
              <button onClick={() => toggleLike(place._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{
                    cursor: 'pointer',
                    fill: likedPlaces.includes(place._id) ? '#FF5733' : 'white',
                    stroke: likedPlaces.includes(place._id) ? 'white' : 'black',
                    strokeWidth: 2,
                  }}
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 16.47 2 13.36 2 9.5 2 7.01 4.01 5 6.5 5c1.74 0 3.41.81 4.5 2.09C11.09 5.81 12.76 5 14.5 5 17.99 5 21 8.01 21 11.5c0 3.86-3.4 6.97-8.55 10.54L12 21.35z"
                    stroke="black"
                  />
                </svg>
              </button>
            </div>
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
</div>







  )
}



export default Places
