import { model, Schema } from "mongoose";
import type {  VoteDocument } from "./vote.types.js";

export const voteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);


const VoteModel = model<VoteDocument>("Vote", voteSchema) 

export default VoteModel