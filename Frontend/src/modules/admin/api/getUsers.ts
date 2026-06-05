// import axiosInstance from "@/app/api/axios";

// import type { UsersResponse } from "../types/userRespones";
// // import type { IUser } from "@/shared/types/user";

// export const getUsers = async (page: number = 1, limit: number = 10): Promise<UsersResponse> => {


//     const response = await axiosInstance.get(
//         `/admin/users?page=${page}&limit=${limit}`
//     )

//     return response.data;
// };


import axiosInstance from "@/app/api/axios";

import type { UsersResponse } from "../types/userRespones";
import type { GetUsersQuery } from "../types/getUsersQuery";

export const getUsers = async (query: GetUsersQuery): Promise<UsersResponse> => {

    const response = await axiosInstance.get(
        "/admin/users",
        {
            params: query,
        }
    );

    return response.data;
};