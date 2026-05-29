import { useMutation } from '@tanstack/react-query'

import { forgotPasswordApi } from '../api/api.forgot-password'

export const useForgotPassword = () => {

  return useMutation({
    mutationFn: forgotPasswordApi,
  })
}