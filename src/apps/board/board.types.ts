import type { Types } from "mongoose";

export type Board = {
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

export type CreateBoardInput = {
  title: string;
  description: string;
  slug: string;

  settings?: {
    allowVoting?: boolean;
    allowComments?: boolean;
  };
};
