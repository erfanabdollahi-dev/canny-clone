import { Types, type HydratedDocument, type InferSchemaType } from "mongoose";
import type z from "zod";
import type { createPostSchema, postQuerySchema, updatePostSchema } from "./post.validation.js";
import type { postSchema } from "./post.model.js";
import type { PaginationQuery } from "@/common/pagination/pagination.types.js";

export enum PostStatus {
  OPEN = "OPEN",
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum PostSortBy {
  NEWEST = "newest",
  OLDEST = "oldest",
  VOTES = "votes",
}

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type PostSchema = InferSchemaType<typeof postSchema>;
export type Post = PostSchema & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type PostDocument = HydratedDocument<Post>;


export type PostQuery = z.infer<typeof postQuerySchema>;
