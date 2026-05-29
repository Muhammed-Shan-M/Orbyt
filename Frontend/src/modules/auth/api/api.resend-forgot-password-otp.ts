import axiosInstance from "../../../app/api/axios" 
import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints"

export const resendForgotOtpApi = async (  email: string) => {

  const response = await axiosInstance.post(
    API_ENDPOINTS.auth.RESEND_FORGOT_PASSWORD_OTP,
    { email }
  )

  return response.data
}