import { loginApi } from "../api/api.login";
import type { LoginPayload, LoginResponse } from "../types/loginTypes";

export const loginService = async (data: LoginPayload): Promise<LoginResponse> => {
    return await loginApi(data);
};