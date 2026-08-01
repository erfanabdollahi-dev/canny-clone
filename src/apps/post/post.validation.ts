import z from "zod";
import { PostStatus } from "./post.types.js";
import { isValidObjectId } from "mongoose";


export const createPostSchema = z.object({
  title : z
    .string()
    .trim()
    .min(1, "title field is required"),
  
  description : z
    .string()
    .trim()
    .min(1, "description field is required"),
  
  board_id : z
    .string()
    .trim()
    .min(1, "boardId field is required")
    .refine(isValidObjectId, {
    message: "Invalid board id",
    }),

  status : z.enum(PostStatus).default(PostStatus.OPEN)
  
})

