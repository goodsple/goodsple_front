import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true, 
    headers: { "Content-Type": "application/json" },
});
  
export default axiosInstance;