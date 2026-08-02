import { isValidObjectId } from "mongoose";
import z from "zod";



export const createVoteSchema = z.object({
  post_id : z
    .string()
    .trim()
    .min(1)
    .refine(isValidObjectId, {message: "Invalid id",}),
  user_id : z
    .string()
    .trim()
    .min(1)
    .refine(isValidObjectId, {message: "Invalid id",}),
})

export const findByIdSchema = z.string().trim().min(1).refine(isValidObjectId, {
  message: "Invalid post id",
});
