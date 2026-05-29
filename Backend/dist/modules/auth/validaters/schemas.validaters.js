"use strict";
// import { z } from "zod";
// import { ERROR_MESSAGES } from "../../../common/constands/error-message.constands";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleSchema = exports.passwordSchema = exports.emailSchema = exports.fullNameSchema = void 0;
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
const zod_1 = require("zod");
const error_message_constands_1 = require("../../../common/constands/error-message.constands");
exports.fullNameSchema = zod_1.z
    .string()
    .min(2)
    .max(100)
    .regex(/^[A-Za-z\s.'-]+$/, error_message_constands_1.ERROR_MESSAGES.VALIDATION.INVALID_NAME)
    .transform(val => val.trim().replace(/\s+/g, " "));
exports.emailSchema = zod_1.z
    .string()
    .email()
    .max(254)
    .transform(val => val.toLowerCase().trim());
exports.passwordSchema = zod_1.z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain special character");
exports.roleSchema = zod_1.z.enum(["founder", "investor"]);
