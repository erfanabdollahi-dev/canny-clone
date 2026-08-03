import type { HydratedDocument, InferSchemaType, Types } from "mongoose";
import type { commentSchema } from "./comment.model.js";
import type z from "zod";
import type { createCommentSchema, updateCommentSchema } from "./comment.validation.js";










export type CreateCommentInput = z.infer<typeof createCommentSchema>
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>



export type CommentSchema = InferSchemaType<typeof commentSchema>;
export type Comment = CommentSchema & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


export type CommentDocument = HydratedDocument<Comment>
