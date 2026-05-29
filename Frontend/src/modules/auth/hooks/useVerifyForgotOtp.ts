import { useMutation } from '@tanstack/react-query'

import { verifyForgotOtpApi } from '../api/api.verify-forgot-otp'

export const useVerifyForgotOtp = () => {

  return useMutation({
    mutationFn: verifyForgotOtpApi,
  })
}