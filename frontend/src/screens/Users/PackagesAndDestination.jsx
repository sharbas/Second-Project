import React ,{useEffect, useState} from 'react'
import userAxiosInstance from '../../utils/userAxiosInstance.js'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router


function PackagesAndDestination() {
  const [packages,setPackages]=useState([])
  const [dataFetched, setDataFetched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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


 const toPlaceswithCatName=(category,packageId)=>{

navigate(`/places?category=${category}&&packageId=${packageId}`)

 }




 const handleSearch = async (event) => {
  event.preventDefault();

  try {
    const response = await userAxiosInstance.get(`/packages/search?term=${searchTerm}`);
    // Handle the response data as needed, for example, set state with the results
    setSearchResults(response.data);
    setSearchTerm('')
  } catch (error) {
    console.error('Error searching for packages:', error);
  }
};


  return  (
//     <div className="relative bg-cover bg-center h-60 w-full" style={{ backgroundImage: 'url("public/travelIamge10.jpg")' }}>
//           <div className=''>
// <form className="flex items-center " onSubmit={handleSearch}>   
//     <label for="simple-search" className="sr-only">Search</label>
//     <div className="relative w-full">
//         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
//             </svg>
//         </div>
//         <input type="text" id="simple-search"  value={searchTerm}  onChange={(event) => setSearchTerm(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search category name..." required/>
//     </div>
//     <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//         <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//         </svg>
//         <span className="sr-only">Search</span>
//     </button>
// </form>
// </div>
//   <div
//     className="absolute top-15 left-0 w-full h-full bg-black bg-cover bg-center opacity-65 border-solid "
//     style={{ backgroundImage: 'url("public/travelIamge10.jpg")' }}
//   ></div>
//   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
//     <h1 className="text-4xl font-bold animate__animated animate__fadeIn text-black ">Explore The World</h1>
//     <p className="text-lg text-black  mt-2 font-sans hover:text-white">Find joy in the journey, and every mile will be worth your while.</p>
//   </div>



// <div className="flex flex-wrap bg-userBgColor justify-between px-20 pt-60">
//       {dataFetched ? (
//         packages
//           .filter((pakge, index, self) => {
//             // Filter out duplicates by checking if the category is unique
//             return (
//               self.findIndex((p) => p.category.toLowerCase() === pakge.category.toLowerCase()) === index
//             );
//           })
//           .map((pakge, index) => (
//             <div
//               className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-40 mb-40 w-80 "
//               key={index}
//             >
//               <a href="#" className="relative">
//   <img
//     className="rounded-t-lg w-80 h-60"
//     src={`http://www.wetravels.online/images/${pakge.categoryImages}`}
//     alt={`category images ${index}`}
//   />
//   <h5 className="absolute top-0 left-0 mb-2 text-2xl font-medium tracking-tight text-black dark:text-white p-4">
//     {pakge.category}
//   </h5>
// </a>

//               <div className="p-5 flex justify-end items-end ">
             
//                 <a
//                   href=""
//                   onClick={() => toPlaceswithCatName(pakge.category,pakge._id)} // Pass the category to the function
//                   className="inline-flex items-center pt- px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800 border-1 hover:border-transparent"
//                 >
//                   Read more
//                   <svg
//                     className="w-3.5 h-3.5 ml-2"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 14 10"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M1 5h12m0 0L9 1m4 4L9 9"
//                     />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           ))
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//     </div>




    <div>
      <div className="relative bg-cover bg-center h-60 w-full" style={{ backgroundImage: 'url("public/travelIamge10.jpg")' }}>
        <form className="flex items-center" onSubmit={handleSearch}>
          {/* ... (your search input and button) ... */}
          <label for="simple-search" className="sr-only">Search</label>
<div className="relative w-full">
<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
</svg>
</div>
<input type="text" id="simple-search"  value={searchTerm}  onChange={(event) => setSearchTerm(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search category name..." required/>
</div>
<button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
</svg>
<span className="sr-only">Search</span>
</button>
        </form>
        <div className="absolute top-15 left-0 w-full h-full bg-black bg-cover bg-center opacity-65 border-solid" style={{ backgroundImage: 'url("public/travelIamge10.jpg")' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold animate__animated animate__fadeIn text-black ">Explore The World</h1>
          <p className="text-lg text-black mt-2 font-sans hover:text-white">Find joy in the journey, and every mile will be worth your while.</p>
        </div>
      </div>
      <div>
        <img src="https://www.wetravels.online/images/categoryImages_1699252235506.jpg" alt="" style={{height:'3px',width:'3px'}} />
        <img src="https://www.wetravels.online/public/images/categoryImages_1699252235506.jpg" alt="" style={{height:'3px',width:'3px'}} />
        <img src="https://www.wetravels.online/categoryImages_1699252235506.jpg" alt="" style={{height:'3px',width:'3px'}} />
        <img src="/images/categoryImages_1699252235506.jpg" alt="" style={{height:'3px',width:'3px'}} />
      </div>

      <div className="flex flex-wrap bg-userBgColor justify-between px-20 pt-60">
        {searchResults.length > 0 ? (
          searchResults
            .filter((result, index, self) => {
              return (
                self.findIndex((r) => r.category.toLowerCase() === result.category.toLowerCase()) === index
              );
            })
            .map((result, index) => (
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-40 w-80" key={index}>
                {/* ... (render search result content) ... */}
                <a href="#" className="relative">
              <img
                className="rounded-t-lg w-80 h-60"
                src={`https://www.wetravels.online/images/${result.categoryImages}`}
                alt={`category images ${index}`}
              />
              <h5 className="absolute top-0 left-0 mb-2 text-2xl font-medium tracking-tight text-black dark:text-white p-4">
                {result.category}
              </h5>
            </a>
            <div className="p-5 flex justify-end items-end">
              <a
                href=""
                onClick={() => toPlaceswithCatName(result.category, result._id)}
                className="inline-flex items-center pt- px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800 border-1 hover:border-transparent"
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
          <div className="flex flex-wrap bg-userBgColor justify-between px-20">
            {dataFetched ? (
              packages
                .filter((pakge, index, self) => {
                  return (
                    self.findIndex((p) => p.category.toLowerCase() === pakge.category.toLowerCase()) === index
                  );
                })
                .map((pakge, index) => (
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  mb-40 w-80 " key={index}>
                    {/* ... (render default content when no search) ... */}
                    <a href="#" className="relative">
<img
className="rounded-t-lg w-80 h-60"
src={`https://www.wetravels.online/images/${pakge.categoryImages}`}
alt={`category images ${index}`}
/>
<h5 className="absolute top-0 left-0 mb-2 text-2xl font-medium tracking-tight text-black dark:text-white p-4">
{pakge.category}
</h5>
</a>

<div className="p-5 flex justify-end items-end ">

  <a
    href=""
    onClick={() => toPlaceswithCatName(pakge.category,pakge._id)} // Pass the category to the function
    className="inline-flex items-center pt- px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800 border-1 hover:border-transparent"
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
        )}
      </div>
    </div>
  );
}




    
  
    
  


export default PackagesAndDestination
