

import axiosInstance from "@/app/api/axios";

import type { IUserDocument } from "@/shared/types/user";

export const getUser = async (userId: string): Promise<IUserDocument> => {

    const response = await axiosInstance.get(
        `/admin/user/${userId}`
    );

    return response.data;
};