import { useMutation } from "@tanstack/react-query";

import { adminLogin } from "../api/adminLogin";

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: adminLogin,
  });
};