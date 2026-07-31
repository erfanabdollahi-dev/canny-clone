import type { Types } from "mongoose";
import type z from "zod";
import type { createBoardSchema } from "./board.validation.js";

export type BoardType = {
  _id: Types.ObjectId;

  title: string;
  description: string;
  slug: string;

  settings: {
    allowVoting: boolean;
    allowComments: boolean;
  };

  createdAt: Date;
  updatedAt: Date;
};

// export type BoardCreateType = {
//   title: string;
//   description: string;

//   settings?: {
//     allowVoting?: boolean;
//     allowComments?: boolean;
//   };
// };


export type BoardCreateType = z.infer<typeof createBoardSchema>;