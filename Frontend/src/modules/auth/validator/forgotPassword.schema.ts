import { z } from 'zod'

import { emailSchema } from '../../../app/validators/fieldSchemas'

export const forgotPasswordSchema = z.object({
  email: emailSchema
})

export type ForgotPasswordFormData = z.infer<
  typeof forgotPasswordSchema
>