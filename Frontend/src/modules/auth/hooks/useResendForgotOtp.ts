import { useMutation } from '@tanstack/react-query'

import { resendForgotOtpApi } from '../api/api.resend-forgot-password-otp' 

export const useResendForgotOtp = () => {

  return useMutation({
    mutationFn: resendForgotOtpApi,
  })

}