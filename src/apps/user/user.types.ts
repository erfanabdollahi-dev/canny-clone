import type { HydratedDocument, InferSchemaType, Types } from "mongoose";
import type { userSchema } from "./user.model.js";

export type UserSchema = InferSchemaType<typeof userSchema>;
export type User = UserSchema & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type PublicUser = Omit<User, "password">;

export type PostDocument = HydratedDocument<User>;
