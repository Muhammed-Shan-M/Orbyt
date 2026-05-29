import axiosInstance from "../../../app/api/axios";
import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints";



export const refreshToken = async () => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.auth.REFRESH_TOKEN
  );

  return response.data;
};