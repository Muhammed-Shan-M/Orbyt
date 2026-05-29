import axios from "axios";
import { authInterceptor } from "./interceptors/auth.interceptor";
import { errorInterceptor } from "./interceptors/error.interceptor";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  authInterceptor
);

axiosInstance.interceptors.response.use(
  response => response,
  errorInterceptor
);


export default axiosInstance;