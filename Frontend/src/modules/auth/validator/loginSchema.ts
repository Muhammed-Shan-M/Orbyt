import z from "zod";

import { emailSchema, passwordSchema, } from "../../../app/validators/fieldSchemas";

export const loginSchema = z.object({
    email: emailSchema,

    password: passwordSchema,
});

export type LoginFormData = z.infer<
    typeof loginSchema
>;