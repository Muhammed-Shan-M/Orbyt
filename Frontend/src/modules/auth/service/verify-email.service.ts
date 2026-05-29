import { verifyEmailApi } from "../api/api.verify-email"

export const verifyEmailService = async (token: string) => {
  const response = await verifyEmailApi(token)

  return response
}