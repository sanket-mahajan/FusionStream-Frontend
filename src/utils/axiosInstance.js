import axios from "axios";
import ErrorHandler from "../components/ErrorHandler/ErrorHandler";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.API_URL ||
    "https://fusionstream-backend.onrender.com/api/v1",
  withCredentials: true, // Sends cookies along with requests
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken"); // Fetch token from cookies
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle Apierror globally
    if (error.response.status === 400) {
      //TODO: Logout user or refreshtoken
      ErrorHandler;
      return;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
