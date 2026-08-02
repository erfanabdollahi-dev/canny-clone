import z from "zod";
import { PostStatus } from "./post.types.js";
import { isValidObjectId, Types } from "mongoose";

export const createPostSchema = z.object({
  title: z.string().trim().min(1, "title field is required"),

  description: z.string().trim().min(1, "description field is required"),

  board: z
    .string()
    .trim()
    .min(1, "board field is required")

    .refine(isValidObjectId, {
      message: "Invalid board id",
    })
    .transform((id) => new Types.ObjectId(id)),

  status: z.enum(PostStatus).default(PostStatus.OPEN),
});

export const updatePostSchema = z.object({
  title: z.string().trim().min(1, "title field is required").optional(),

  description: z
    .string()
    .trim()
    .min(1, "description field is required")
    .optional(),

  board: z
    .string()
    .trim()
    .min(1, "board field is required")
    .refine(isValidObjectId, {
      message: "Invalid board id",
    })
    .transform((id) => new Types.ObjectId(id))
    .optional(),

  status: z.enum(PostStatus).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
  path: ["title | description | board | status"] // or whatever makes sense for your API
  
});


export const findByIdSchema = z.string().trim().min(1).refine(isValidObjectId, {
  message: "Invalid post id",
});
