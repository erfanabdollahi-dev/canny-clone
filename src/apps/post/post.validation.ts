import z from "zod";
import { PostStatus } from "./post.types.js";
import { isValidObjectId, Types } from "mongoose";

export const createPostSchema = z.object({
  title: z.string().trim().min(1, "title field is required"),

  description: z.string().trim().min(1, "description field is required"),

  board_id: z
    .string()
    .trim()
    .min(1, "boardId field is required")
    .refine(isValidObjectId, {
      message: "Invalid board id",
    }),

  status: z.enum(PostStatus).default(PostStatus.OPEN),
});

export const updatePostSchema = z.object({
  title: z.string().trim().min(1, "title field is required").optional(),

  description: z
    .string()
    .trim()
    .min(1, "description field is required")
    .optional(),

  board_id: z
    .string()
    .trim()
    .min(1, "boardId field is required")
    .refine(isValidObjectId, {
      message: "Invalid board id",
    })
    .transform((id) => new Types.ObjectId(id))
    .optional(),

  status: z.enum(PostStatus).default(PostStatus.OPEN).optional(),
});

export const findByIdSchema = z
  .string()
  .trim()
  .min(1).refine(isValidObjectId, {
  message: "Invalid post id",
})
