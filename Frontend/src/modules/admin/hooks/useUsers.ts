import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api/getUsers";

export const useUsers = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["admin-users", page, limit],

        queryFn: () =>
            getUsers(page, limit),
    });
};