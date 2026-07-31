import type { Types } from "mongoose";

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

export type CreateBoardType = {
  title: string;
  description: string;
  slug: string;

  settings?: {
    allowVoting?: boolean;
    allowComments?: boolean;
  };
};
