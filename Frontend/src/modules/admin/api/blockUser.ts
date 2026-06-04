import axiosInstance from "@/app/api/axios";


export const blockUser = async (userId: string) => {
  const response = await axiosInstance.patch(
    `/admin/user/${userId}/block`
  );

  return response.data;
};