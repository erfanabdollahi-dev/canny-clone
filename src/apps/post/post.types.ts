import { Types, type HydratedDocument, type InferSchemaType } from "mongoose";
import type z from "zod";
import type { createPostSchema } from "./post.validation.js";
import type { postSchema } from "./post.model.js";

export enum PostStatus {
  OPEN = "OPEN",
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

// export type PostType = {
//   _id: Types.ObjectId;

//   title: string;
//   description: string;

//   board_id: Types.ObjectId;
//   status: PostStatus;

//   // voteCount: number;

//   // imageUrl?: string;

//   createdAt: Date;
//   updatedAt: Date;
// };

export type PostInputType = z.infer<typeof createPostSchema>;

type Post = InferSchemaType<typeof postSchema>;
export type PostDocument = HydratedDocument<Post>;

