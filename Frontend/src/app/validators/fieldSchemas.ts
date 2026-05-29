import { z } from "zod";


export const emailSchema = z
  .email("Invalid email address")
  .trim()
  .toLowerCase();

export const fullNameSchema = z
  .string()
  .trim()
  .min(3, "Full name must be at least 3 characters")
  .max(50, "Full name cannot exceed 50 characters");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password cannot exceed 128 characters")
  .regex(/[A-Z]/,"Password must contain at least one uppercase letter")
  .regex(/[a-z]/,"Password must contain at least one lowercase letter")
  .regex(/[0-9]/,"Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/,"Password must contain at least one special character");


export const roleSchema = z.enum(
  ["founder", "investor"],
  {
    error: "Please select a valid role",
  }
);
   