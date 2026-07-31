import {z} from 'zod';


export const createBoardSchema = z.object({
  title : z
    .string()
    .trim()
    .min(1, "Title field is Required"),

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
    .min(1, "Slug field is required feild ")
