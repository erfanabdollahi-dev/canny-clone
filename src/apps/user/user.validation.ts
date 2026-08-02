import { isValidObjectId } from "mongoose";
import z from "zod";


export const createUserSchema = z.object({
  full_name : z
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
export const findByIdSchema = z.string().trim().min(1).refine(isValidObjectId, {
  message: "Invalid user id",
});

export const updateUserSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
});

