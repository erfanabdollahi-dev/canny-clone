import { isValidObjectId } from 'mongoose';
import {z} from 'zod';


export const createBoardSchema = z.object({
  title : z
    .string()
    .trim()
    .min(1, "Title field is required"),

  description : z
    .string()
    .trim()
    .min(1, "Description field is required"),
  
  settings : z
    .object({
      allowVoting : z.boolean().default(true),
      allowComments : z.boolean().default(true)
    })
    .optional()
    .default({allowComments : true, allowVoting : true}),
})

export const findBySlugSchema = z
    .string()
    .trim()
    .min(1, "Slug field is required")

export const findByIdSchema = z
    .string()
    .trim()
    .min(1).refine(isValidObjectId, {
    message: "Invalid board id",
  })

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