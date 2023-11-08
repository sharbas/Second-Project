import axios from "axios";


const hotelAxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/hotel', // Replace with your API URL
    headers: {
      'Content-Type': 'application/json',
      withCredentials: true, // If needed for cross-origin requests
    },
  });
  
  // Apply the authcheck middleware to the Axios instance
  hotelAxiosInstance.interceptors.request.use(
    async (config) => {
      const hotelInfo = localStorage.getItem('hotelInfo');
      const parsedHotelInfo = JSON.parse(hotelInfo); // Parse the JSON string
      const token=parsedHotelInfo.hotelToken
      // Authorization = `Bearer ${token}`
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

  export default hotelAxiosInstance;