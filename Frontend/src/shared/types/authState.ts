import type { IUser } from "./user";

export interface AuthState {
  user: IUser | null;
  accessToken: string | null,
  isAuthenticated: boolean;
  isAuthChecked: boolean
}