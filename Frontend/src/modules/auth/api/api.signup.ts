import axiosInstance from "../../../app/api/axios";
import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints";
import type { SignupPayload } from "../types/signupPayload";



export const signupUser = async (data: SignupPayload) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.auth.SIGNUP,
    data
  );

  return response.data;
};