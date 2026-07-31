import {z} from 'zod';


export const createBoardSchema = z.object({
  title : z
    .string()
    .trim()
    .min(1, "Title is Required"),

  description : z
    .string()
    .trim()
    .min(1, "Description is required"),
  
  settings : z
    .object({
      allowVoting : z.boolean().default(true),
      allowComments : z.boolean().default(true)
    })
    .optional()
    .default({allowComments : true, allowVoting : true}),
})

