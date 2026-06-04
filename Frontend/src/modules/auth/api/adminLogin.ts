import axiosInstance from "@/app/api/axios";

import type {  AdminLoginRequest,  AdminLoginResponse,} from "../types/admin-auth.types"

export const adminLogin = async (  data: AdminLoginRequest): Promise<AdminLoginResponse> => {
  const response = await axiosInstance.post<AdminLoginResponse>(
    "auth/admin/login",
    data
  );

  return response.data;
};