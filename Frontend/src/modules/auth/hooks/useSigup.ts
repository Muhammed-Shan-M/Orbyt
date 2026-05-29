import { useMutation } from "@tanstack/react-query";
import { signupService } from "../service/signup.service";

export const useSignup = () => {
  return useMutation({
    mutationFn: signupService,
  });
};