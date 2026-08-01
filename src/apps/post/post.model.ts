import { model, Schema } from "mongoose";
import { PostStatus } from "./post.types.js";

const postSchema = new Schema(
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
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const Post = model("Post", postSchema);

export default Post;
