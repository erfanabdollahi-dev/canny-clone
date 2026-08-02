import z from "zod";



export const loginSchema = z.object({
  email: z
    .email()
    .trim()
    .toLowerCase(),

  password : z
    .string()
    .min(1 , "Password is required")
})


export const registerSchema = z.object({
  email: z
    .email("Invalid email")
    .trim()
    .toLowerCase(),
  full_name: z
  .string()
  .trim()
  .min(2, "full_name should be at leat 2 characters")
  ,
  password : z
    .string()
    .min(8 , "Password must be at least 8 characters")
})