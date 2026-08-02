import { model, Schema } from "mongoose";
import type { User } from "./user.types.js";

export const userSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const UserModel = model<User>("User", userSchema);

export default UserModel;
