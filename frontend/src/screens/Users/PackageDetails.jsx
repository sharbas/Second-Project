import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useLocation,useNavigate } from 'react-router-dom';
import userAxiosInstance from '../../utils/userAxiosInstance';



  

function PackageDetailsUser() {

  const [formDetails,setFormDetails]=useState({
    name:'',
    phone:'',
    address:'',
    email:'',
    country:'',
    members:'',
  })

  const navigate=useNavigate()
const location=useLocation()
const searchParams=new URLSearchParams(location.search)
const catgorey=searchParams.get('category')
const place=searchParams.get('place')


  const countries = [
    { value: 'india', label: 'India', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1920px-Flag_of_India.svg.png' },
    { value: 'france', label: 'France', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1920px-Flag_of_France.svg.png' },
    { value: 'spain', label: 'Spain', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1920px-Flag_of_Spain.svg.png' },
    { value: 'italy', label: 'Italy', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1920px-Flag_of_Italy.svg.png' },
    { value: 'germany', label: 'Germany', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png' },
    { value: 'greece', label: 'Greece', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Flag_of_Greece.svg/1920px-Flag_of_Greece.svg.png' },
    { value: 'turkey', label: 'Turkey', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1920px-Flag_of_Turkey.svg.png' },
    { value: 'egypt', label: 'Egypt', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/1920px-Flag_of_Egypt.svg.png' },
    { value: 'uae', label: 'United Arab Emirates', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1920px-Flag_of_the_United_Arab_Emirates.svg.png' },
    { value: 'saudi', label: 'Saudi Arabia', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/1920px-Flag_of_Saudi_Arabia.svg.png' },
    { value: 'uk', label: 'United Kingdom', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1920px-Flag_of_the_United_Kingdom.svg.png' },
    { value: 'switzerland', label: 'Switzerland', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Flag_of_Switzerland.svg/1920px-Flag_of_Switzerland.svg.png' },
    { value: 'austria', label: 'Austria', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/1920px-Flag_of_Austria.svg.png' },
    { value: 'sweden', label: 'Sweden', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1920px-Flag_of_Sweden.svg.png' },
    { value: 'netherlands', label: 'Netherlands', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1920px-Flag_of_the_Netherlands.svg.png' },
    { value: 'japan', label: 'Japan', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1920px-Flag_of_Japan.svg.png' },
    { value: 'canada', label: 'Canada', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/1920px-Flag_of_Canada.svg.png' },
    { value: 'australia', label: 'Australia', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Flag_of_Australia.svg/1920px-Flag_of_Australia.svg.png' },
    { value: 'brazil', label: 'Brazil', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1920px-Flag_of_Brazil.svg.png' },
    { value: 'southafrica', label: 'South Africa', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/1920px-Flag_of_South_Africa.svg.png' },
  ];



  useEffect(()=>{
    console.log(formDetails,'this is formdetails');
  },[formDetails])



  const [details,setDetails]=useState([])
  const [isDetails,setIsDetails]=useState(false)

  const submitHandler=async(e)=>{
    e.preventDefault()
try{
  console.log('this is submitHandler');

  const formData = new FormData();
  
  formData.append("name", formDetails.name);
  formData.append("phone", formDetails.phone);
  formData.append("address", formDetails.address);
  formData.append("email", formDetails.email);
  formData.append("country", formDetails.country);
  formData.append("members", formDetails.members);
  const res = await userAxiosInstance.post(`/mainUserDetails?category=${catgorey}&place=${place}`,formData)
   console.log(res.data.bookedUserId,'this is bookeduseriddddddddd');
   const bookedUserId=res.data.bookedUserId
  navigate(`/paymentAndDetails/${catgorey}/${place}/${bookedUserId}`)

}catch(error){

}
  }


  useEffect(()=>{  
    const fetchData=async()=>{
 


      try{
        const res=await userAxiosInstance.get(`/loadFullDetails?category=${catgorey}&place=${place}`)
        const fullDetails=res.data

        setDetails(fullDetails)
        setIsDetails(true)

      }catch(error){
        console.error('Error fetching data:',error)
      }
    }
    fetchData()
  }, [location.search])

  useEffect(()=>{
console.log('this is details',details);
  },[details])

  return (
<div className="w-5/6 mx-auto  m-20">
<div className="relative h-40 md:h-60 overflow-hidden shadow-md rounded-xl bg-clip-border shadow-blue-gray-500/40 mb-8">
  <img
    src="/travelImage5.jpg"
    alt="banner"
    className="object-cover w-full h-full hover:opacity-75 transition-opacity duration-300 ease-in-out"
  />
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
    <h1 className="text-4xl font-bold animate__animated animate__fadeIn">
      Details and Payment
    </h1>
    <p className="text-lg mt-2 animate__animated animate__fadeIn">
      Secure your spot now and make memories!
    </p>
  </div>
</div>

  {isDetails ? (
    <div className="bg-white text-center md:text-left w-full max-w-[1400px] mx-auto rounded-lg shadow-md p-5" style={{ backgroundImage: 'url("/detailsBg2.jpg")' }}>
   
      <div className="bg-opacity-60 bg-cover bg-center h-32 relative   flex justify-between rounded" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
  <div className="text-white text-2xl font-serif absolute bottom-4 left-4 pb-8 ">
    {details[0].place}
  </div>
  <div className="text-white absolute bottom-0 right-4   flex justify-end pt-10">
    <p className="text-m font-light mb-2">Duration of Trip: {details[0].duration} Days</p>
  </div>
</div>

<div className="mt-4 p-4 relative rounded" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
  <h2 className="text-xl font-medium mb-2 text-white">Detailed Description</h2>
  <p className="text-gray-700 font-medium text-white">
    {details[0].detailedDescription}
  </p>
</div>

      <div className="mt-4 flex justify-start">
        <h2 className="text-xl font-meduim mb-2">Per Person: ₹{details[0].price}</h2>
      </div>
      <div className="mt-4 xl:ml-40 bg-gray rounded-lg shadow-lg w-4/5 ">
        <h2 className="text-xl font-semibold m-6 pt-14">Book your ticket</h2>
        <form onSubmit={submitHandler} className="grid grid-cols-2 gap-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
  type="text"
  id="name"
  name="name"
  onChange={(e) =>
    setFormDetails((prevFormDetails) => ({
      ...prevFormDetails,
      name: e.target.value,
    }))
  }
  className="mt-1 p-2 border rounded-lg w-4/5"
  required />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="text" id="phone" name="phone"   onChange={(e) =>
    setFormDetails((prevFormDetails) => ({
      ...prevFormDetails,
      phone: e.target.value,
    }))
  } className="mt-1 p-2 border rounded-lg w-4/5" required/>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" id="address" name="address"   onChange={(e) =>
    setFormDetails((prevFormDetails) => ({
      ...prevFormDetails,
      address: e.target.value,
    }))
  } className="mt-1 p-2 border rounded-lg w-4/5" required/>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" name="email"   onChange={(e) =>
    setFormDetails((prevFormDetails) => ({
      ...prevFormDetails,
      email: e.target.value,
    }))
  } className="mt-1 p-2 border rounded-lg w-4/5" required/>
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <Select
              id="country"
              name="country"
              options={countries}
              value={formDetails.country ? { value: formDetails.country, label: formDetails.country } : null}
              onChange={(e) =>
                setFormDetails((prevFormDetails) => ({
                  ...prevFormDetails,
                  country: e.value,
                }))
              }
              className="mt-1 ml-5 border rounded-lg w-4/5 focus:outline-none focus:ring focus:border-blue-300"
    required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="members" className="block text-sm font-medium text-gray-700">Total Members</label>
            <select
              id="members"
              name="members"
              onChange={(e)=>
                setFormDetails((prevFormDetails)=> ({
                  ...prevFormDetails,
                  members: e.target.value,
                }))
              }
              className="mt-1 p-2 border rounded-lg w-4/5"
              required>
              {Array.from({ length: 50 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-10  col-span-2 xl:flex justify-end mr-11">
            <button
              type="submit"
              className="bg-blue-500 text-white text-sm py-1 px-4 rounded-lg w-1/3 flex items-center justify-between"
         >
              Payment and Details
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Loading pls wait</h2>
    
    </div>
  )}
</div>

  
  );
}

export default PackageDetailsUser;
