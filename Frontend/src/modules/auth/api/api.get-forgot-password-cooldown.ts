import axiosInstance from "../../../app/api/axios" 
import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints"

export const getForgotPasswordCooldownApi = async (email: string) => {

    const response = await axiosInstance.get(
        API_ENDPOINTS.auth.FORGOTPASSWORD_COOLDOWN,
        {
          params: { email }
        }
      )

    return response.data.data
}