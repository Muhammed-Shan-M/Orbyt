import { useMutation } from '@tanstack/react-query'

import { verifyEmailService } from '../service/verify-email.service'

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmailService,
  })
}