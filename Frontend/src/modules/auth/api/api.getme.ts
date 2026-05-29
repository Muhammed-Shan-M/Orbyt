import axiosInstance from "../../../app/api/axios";
import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints";

export const getCurrentUser = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.auth.ME);

  return response.data;
};