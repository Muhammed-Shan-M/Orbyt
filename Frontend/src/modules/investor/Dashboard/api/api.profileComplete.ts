import axiosInstance from "../../../../app/api/axios";

export const getProfileCompletionApi = async () => {

    const response = await axiosInstance.get(
        '/auth/profile-completion'
      );

    return response.data;

};