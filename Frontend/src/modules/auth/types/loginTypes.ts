import type { IUser } from "../../../shared/types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: IUser;
  accessToken: string;
}