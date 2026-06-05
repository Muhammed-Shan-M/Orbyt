// import { useQuery } from "@tanstack/react-query";

// import { getUsers } from "../api/getUsers";

// export const useUsers = (page: number, limit: number) => {
//     return useQuery({
//         queryKey: ["admin-users", page, limit],

//         queryFn: () =>
//             getUsers(page, limit),
//     });
// };


import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api/getUsers";
import type { GetUsersQuery } from "../types/getUsersQuery";

export const useUsers = (query: GetUsersQuery) => {
    return useQuery({
        queryKey: ["admin-users", query],

        queryFn: () => getUsers(query),
    });
};