import axios from "axios";


const adminAxiosInstance = axios.create({
    baseURL: 'https://travelwithwetravel.website/api/admin', // Replace with your API URL
    headers: {
      
      'Content-Type': 'application/json',
      withCredentials: true, // If needed for cross-origin requests
    },
  });
  
  // Apply the authcheck middleware to the Axios instance
  adminAxiosInstance.interceptors.request.use(
    async (config) => {
      const adminInfo = localStorage.getItem('adminInfo');
      const parsedAdminInfo=JSON.parse(adminInfo)
      const token=parsedAdminInfo.adminToken
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export default adminAxiosInstance