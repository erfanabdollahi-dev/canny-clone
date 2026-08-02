import z from "zod";


export const createUserSchema = z.object({
  fullName : z
    .string()
    .trim()
    .min(2)
    .max(100),
  
    email : z
      .email()
      .toLowerCase()
      .trim(),

    password : z
      .string()
      .min(8)
      .max(100)
})


export type CreateUserInput = z.infer<typeof createUserSchema>