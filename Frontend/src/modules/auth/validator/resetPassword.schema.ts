import { z } from 'zod'

import { passwordSchema } from '../../../app/validators/fieldSchemas' 

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z
      .string()
      .trim(),
  })

  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    }
  )