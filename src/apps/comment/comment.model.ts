import { model, Schema } from "mongoose";
import type { CommentDocument } from "./comment.types.js";



export const commentSchema = new Schema({

  content : {
    type : String,
    required : true,
  },

  author  :{
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true,
  },

  post : {
    type : Schema.Types.ObjectId,
    ref : "Post",
    required: true
  }

}, {timestamps : true, versionKey : false})



const CommentModel = model<CommentDocument>("Comment", commentSchema);


export default CommentModel