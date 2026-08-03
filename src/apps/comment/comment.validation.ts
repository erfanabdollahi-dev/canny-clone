import { isValidObjectId, Types } from "mongoose";
import z from "zod";



export const createCommentInputSchema = z.object({

  content : z
    .string()
    .trim()
    .min(2, "content should be at least 2 char"),
})


export const createCommentSchema = z.object({

  content : z
    .string()
    .trim()
    .min(2, "content should be at least 2 char"),

  author :  z
     .string()
      .trim()
      .min(1, "author field is required")
      .refine(isValidObjectId, {
        message: "Invalid author id",
      })
      .transform((id) => new Types.ObjectId(id)),
  post :  z
     .string()
      .trim()
      .min(1, "post field is required")
      .refine(isValidObjectId, {
        message: "Invalid author id",
      })
      .transform((id) => new Types.ObjectId(id)),
  

})
export const updateCommentSchema = z.object({

  content : z
    .string()
    .trim()
    .min(1, "content field is required")
})


