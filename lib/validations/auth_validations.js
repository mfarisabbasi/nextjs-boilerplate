import { z } from "zod";

export const LoginValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignupValidation = z.object({
  fullName: z
    .string()
    .min(1, { message: "Name is required" })
    .max(30, { message: "Name must be less than 30 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const ResetPasswordValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const ConfirmResetPasswordValidation = z.object({
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Cofnrim Password is required" }),
});
