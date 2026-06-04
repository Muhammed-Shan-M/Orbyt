import type { IUser } from "@/shared/types/user";

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;

  user: IUser
  accessToken: string;
}