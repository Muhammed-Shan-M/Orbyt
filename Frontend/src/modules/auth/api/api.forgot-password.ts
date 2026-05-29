import axiosInstance from '../../../app/api/axios'

import { API_ENDPOINTS } from '../../../shared/constants/apiEndpoints'

type ForgotPasswordPayload = {
    email: string
}

export const forgotPasswordApi = async (data: ForgotPasswordPayload) => {

    const response = await axiosInstance.post(API_ENDPOINTS.auth.FORGOT_PASSWORD, data)

    return response.data
}