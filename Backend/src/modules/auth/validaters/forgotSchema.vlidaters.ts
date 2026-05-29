import z from "zod";
import { emailSchema } from "./schemas.validaters";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});