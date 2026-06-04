import axiosInstance from "@/app/api/axios";


export const unblockUser = async (
  userId: string
) => {
  const response = await axiosInstance.patch(
    `/admin/user/${userId}/unblock`
  );

  return response.data;
};