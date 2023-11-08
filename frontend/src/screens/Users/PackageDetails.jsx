import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import userAxiosInstance from '../../utils/userAxiosInstance';


  

function PackageDetailsUser() {
  const [selectedCountry, setSelectedCountry] = useState(null);
const location=useLocation()
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

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const [details,setDetails]=useState([])
  const [isDetails,setIsDetails]=useState(false)


  useEffect(()=>{  
    const fetchData=async()=>{
      const searchParams=new URLSearchParams(location.search)
      const catgorey=searchParams.get('category')
      const place=searchParams.get('place')


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
<div className="w-3/5 mx-auto bg-userBgColor m-20">
  {isDetails ? (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h1 className='text-bold'>Payment and details</h1>
      <div className="bg-opacity-60 bg-cover bg-center h-32 relative bg-black" >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="text-white text-2xl font-semibold absolute bottom-4 left-4">
          {details[0].place}
        </div>
        <div className="text-white absolute bottom-2 left-4 pt-4" style={{ marginTop: "10px" }}>
          Duration of Trip: {details[0].duration} Days
        </div>
      </div>
      <div className="mt-4 p-4">
        <h2 className="text-xl font-semibold mb-2">Detailed Description</h2>
        <p className="text-gray-700">
          {details[0].detailedDescription}
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Price: {details[0].price}</h2>
      </div>
      <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Book your ticket</h2>
        <form className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" className="mt-1 p-2 border rounded-lg w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="text" id="phone" name="phone" className="mt-1 p-2 border rounded-lg w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" id="address" name="address" className="mt-1 p-2 border rounded-lg w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" name="email" className="mt-1 p-2 border rounded-lg w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <Select
              id="country"
              name="country"
              options={countries}
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="members" className="block text-sm font-medium text-gray-700">Total Members</label>
            <select
              id="members"
              name="members"
              className="mt-1 p-2 border rounded-lg w-full"
            >
              {Array.from({ length: 50 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 col-span-2">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-2 rounded-lg w-1/2 flex items-center justify-between"
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
      <h2 className="text-xl font-semibold mb-4">Book your ticket</h2>
      <form className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" className="mt-1 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="text" id="phone" name="phone" className="mt-1 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" id="address" name="address" className="mt-1 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" name="email" className="mt-1 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <Select
            id="country"
            name="country"
            options={countries}
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="members" className="block text-sm font-medium text-gray-700">Total Members</label>
          <select
            id="members"
            name="members"
            className="mt-1 p-2 border rounded-lg w-full"
          >
            {Array.from({ length: 50 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-1 px-1 rounded-lg w-1/3 flex items-center justify-between"
          >
            Payment and Details
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </form>
    </div>
  )}
</div>

  
  );
}

export default PackageDetailsUser;
