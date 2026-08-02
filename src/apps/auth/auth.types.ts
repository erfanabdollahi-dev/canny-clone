import type z from "zod";
import type { loginSchema } from "./auth.validation.js";

export type LoginInput = z.infer<typeof loginSchema>;