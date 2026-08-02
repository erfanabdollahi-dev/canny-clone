import type { HydratedDocument, InferSchemaType, Types } from "mongoose";
import type z from "zod";
import type {
  createBoardSchema,
  updateBoardSchema,
} from "./board.validation.js";
import type { boardSchema } from "./board.model.js";

export type CreateBoardInput = z.infer<typeof createBoardSchema>;
export type CreateBoardRepo = CreateBoardInput & {
  slug: string;
};
export type UpdateBoardInput = z.infer<typeof updateBoardSchema>;

export type BoardSchema = InferSchemaType<typeof boardSchema>;

export type Board = BoardSchema & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type BoardDocument = HydratedDocument<Board>;
