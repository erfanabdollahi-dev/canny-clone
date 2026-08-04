import type z from "zod";
import type { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "./auth.validation.js";

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;