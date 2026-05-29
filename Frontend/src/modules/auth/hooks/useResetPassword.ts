import { useMutation } from '@tanstack/react-query'

import { resetPasswordApi } from '../api/api.reset-password'

export const useResetPassword = () => {

  return useMutation({
    mutationFn: resetPasswordApi,
  })
}