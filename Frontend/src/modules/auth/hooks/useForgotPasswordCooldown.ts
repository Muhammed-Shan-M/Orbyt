import { useQuery } from '@tanstack/react-query'
import { getForgotPasswordCooldownApi } from '../api/api.get-forgot-password-cooldown'



export const useForgotPasswordCooldown = (email: string) => {

    return useQuery({

      queryKey: [
        'forgot-password-cooldown',
        email
      ],

      queryFn: () =>  getForgotPasswordCooldownApi(email),

      enabled: !!email,

      staleTime: 0,

      retry: false,

    })

}