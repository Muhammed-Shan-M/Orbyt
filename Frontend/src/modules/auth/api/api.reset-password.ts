import axiosInstance from "../../../app/api/axios"

import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints"

type ResetPasswordPayload = {
    email: string
    password: string
    confirmPassword: string
}

export const resetPasswordApi = async (data: ResetPasswordPayload) => {

    const response = await axiosInstance.post(API_ENDPOINTS.auth.RESET_PASSWORD, data)

    return response.data
}