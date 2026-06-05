import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api/getUser";

export const useUser = (userId: string | null) => {

    return useQuery({
        queryKey: ["admin-user", userId],

        queryFn: () => getUser(userId!),

        enabled: !!userId,
    });

};