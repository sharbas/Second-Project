import axios from "axios";


const userAxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/users', // Replace with your API URL
    headers: {
      'Content-Type': 'application/json',
      withCredentials: true, // If needed for cross-origin requests
    },
  });
  
  // Apply the authcheck middleware to the Axios instance
  userAxiosInstance.interceptors.request.use(
    async (config) => {
      const userInfo = localStorage.getItem('userInfo');
      const token=userInfo.userToken
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

  export default userAxiosInstance;