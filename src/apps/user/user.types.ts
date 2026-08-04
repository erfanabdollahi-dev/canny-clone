import type { HydratedDocument, InferSchemaType, Types } from "mongoose";
import type { userSchema } from "./user.model.js";
import type { createUserSchema, updateUserSchema } from "./user.validation.js";
import type z from "zod";

export type UserSchema = InferSchemaType<typeof userSchema>;
export type User = UserSchema & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type PublicUser = Omit<User, "password">;

export type PostDocument = HydratedDocument<User>;
export type CreateUserInput = z.infer<typeof createUserSchema> & {
  role?: UserRole
}
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}