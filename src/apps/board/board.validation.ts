import { isValidObjectId } from 'mongoose';
import {z} from 'zod';


export const createBoardSchema = z.object({
  title : z
    .string()
    .trim()
    .min(1, "title field is required"),

  description : z
    .string()
    .trim()
    .min(1, "description field is required"),
  
  settings : z
    .object({
      allowVoting : z.boolean().default(true).optional(),
      allowComments : z.boolean().default(true).optional()
    })
    .default({allowComments : true, allowVoting : true})
    .optional(),
})

export const findBySlugSchema = z
    .string()
    .trim()
    .min(1, "slug field is required")


export const updateBoardSchema = z.object({
  title : z
    .string()
    .trim()
    .min(1)
    .optional(),

  description : z
    .string()
    .trim()
    .min(1)
    .optional(),
  
  settings : z
    .object({
      allowVoting : z.boolean().optional(),
      allowComments : z.boolean().optional()
    })
    .optional()
})

export const findByIdSchema = z.string().trim().min(1).refine(isValidObjectId, {
  message: "Invalid post id",
});
