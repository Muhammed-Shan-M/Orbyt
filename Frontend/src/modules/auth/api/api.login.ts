
import axiosInstance from "../../../app/api/axios";
import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints";
import type { LoginPayload, LoginResponse } from "../types/loginTypes";

export const loginApi = async (data: LoginPayload): Promise<LoginResponse> => {

  const response = await axiosInstance.post<LoginResponse>(
      API_ENDPOINTS.auth.LOGIN ,
      data
    );

  return response.data;
};