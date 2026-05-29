

import axiosInstance from "../../../app/api/axios" 
import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints"

export const logoutApi = async () => {
  const response = await axiosInstance.post(API_ENDPOINTS.auth.LOGOUT)

  return response.data
}