import { Types } from "mongoose";

export enum PostStatus {
  OPEN = "OPEN",
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export type PostType = {
  _id: Types.ObjectId;

  title: string;
  description: string;

  boardId: Types.ObjectId;
  status: PostStatus;

  // voteCount: number;

  // imageUrl?: string;

  createdAt: Date;
  updatedAt: Date;
};
