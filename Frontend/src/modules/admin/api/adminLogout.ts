

import axiosInstance from "@/app/api/axios";

export const logoutApi = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
};