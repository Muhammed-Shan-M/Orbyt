import { signupUser } from "../api/api.signup"; 
import type { FormState } from "../types/formState";

export const signupService = async ( data: FormState ) => {
  const response = await signupUser(data);

  return response;
};