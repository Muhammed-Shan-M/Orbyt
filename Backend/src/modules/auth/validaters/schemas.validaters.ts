// import { z } from "zod";
// import { ERROR_MESSAGES } from "../../../common/constands/error-message.constands";

// export const signupSchema = z.object({
//   fullName: z
//     .string()
//     .min(2)
//     .max(100)
//     .regex(/^[A-Za-z\s.'-]+$/, ERROR_MESSAGES.VALIDATION.INVALID_NAME)
//     .transform(val => val.trim().replace(/\s+/g, " ")),

//   email: z
//     .string()
//     .email()
//     .max(254)
//     .transform((val) => val.toLowerCase().trim()),

//   password: z
//     .string()
//     .min(8)
//     .max(128)
//     .regex(/[A-Z]/, "Must contain uppercase")
//     .regex(/[a-z]/, "Must contain lowercase")
//     .regex(/[0-9]/, "Must contain number")
//     .regex(/[^A-Za-z0-9]/, "Must contain special character"),

//   confirmPassword: z.string(),

//   role: z.enum(["founder", "investor"]),
// })
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });


import { z } from "zod";
import { ERROR_MESSAGES } from "../../../common/constands/error-message.constands";

export const fullNameSchema = z
  .string()
  .min(2)
  .max(100)
  .regex(/^[A-Za-z\s.'-]+$/, ERROR_MESSAGES.VALIDATION.INVALID_NAME)
  .transform(val => val.trim().replace(/\s+/g, " "));

export const emailSchema = z
  .string()
  .email()
  .max(254)
  .transform(val => val.toLowerCase().trim());

export const passwordSchema = z
  .string()
  .min(8)
  .max(128)
  .regex(/[A-Z]/, "Must contain uppercase")
  .regex(/[a-z]/, "Must contain lowercase")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[^A-Za-z0-9]/, "Must contain special character");

export const roleSchema = z.enum(["founder", "investor"]);