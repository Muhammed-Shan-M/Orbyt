import axiosInstance from "../../../app/api/axios"

import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints"

type VerifyForgotOtpPayload = {
    email: string
    otp: string
}

export const verifyForgotOtpApi = async (data: VerifyForgotOtpPayload) => {

    const response = await axiosInstance.post(API_ENDPOINTS.auth.VERIFY_OTP, data)

    return response.data
}