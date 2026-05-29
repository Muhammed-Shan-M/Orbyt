import z from "zod";
import { emailSchema, fullNameSchema, passwordSchema, roleSchema } from "../../../app/validators/fieldSchemas";



export const signupSchema = z
    .object({
        email: emailSchema,

        fullName: fullNameSchema,

        password: passwordSchema,

        confirmPassword: z.string(),

        role: roleSchema,
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );




export type SignupFormData = z.infer<
    typeof signupSchema
>;