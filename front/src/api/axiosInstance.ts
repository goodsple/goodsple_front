import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true, 
    headers: { "Content-Type": "application/json" },
});

// 요청마다 localStorage의 accessToken을 헤더에 추가
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;