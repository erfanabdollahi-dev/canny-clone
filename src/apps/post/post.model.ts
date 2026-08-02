import { model, Schema } from "mongoose";
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
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required : true
    },
    voteCount : {
      type : Number,
      default : 0,
      
    }
  },
  { timestamps: true, versionKey: false },
);

const PostModel = model<PostDocument>("Post", postSchema);

export default PostModel;
