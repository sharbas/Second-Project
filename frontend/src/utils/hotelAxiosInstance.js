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
      const token=hotelInfo.hotelToken
      console.log('hotelToken',token)
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