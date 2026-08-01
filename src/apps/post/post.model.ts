import { model, Schema, type HydratedDocument, type InferSchemaType } from "mongoose";
import { PostStatus, type PostDocument } from "./post.types.js";

export const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.OPEN,
    },
    board_id: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);


const PostModel = model<PostDocument>("Post", postSchema);



export default PostModel;
