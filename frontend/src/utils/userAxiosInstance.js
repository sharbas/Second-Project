import axios from "axios";


const userAxiosInstance = axios.create({
    baseURL: 'https://www.wetravels.online/api/users', // Replace with your API URL
    headers: {
      'Content-Type': 'application/json',
      
    },
  });
  // Apply the authcheck middleware to the Axios instance
  userAxiosInstance.interceptors.request.use(
    async (config) => {
      const userInfo = localStorage.getItem('userInfo');


      const parsedUserInfo=JSON.parse(userInfo)

      const token=parsedUserInfo.userToken
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