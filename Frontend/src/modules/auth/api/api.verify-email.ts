import axiosInstance from "../../../app/api/axios"

export const verifyEmailApi = async (token: string) => {

  const response = await axiosInstance.post(
    '/auth/verify-email',
    {
      token,
    }
  )
  

  return response.data
}