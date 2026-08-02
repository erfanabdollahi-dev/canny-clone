import { Schema, model } from "mongoose";
import type { Board } from "./board.types.js";

export const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    settings: {
      type: {
        allowVoting: {
          type: Boolean,
          default: true,
        },
        allowComments: {
          type: Boolean,
          default: true,
        },
      },
      default: {
        allowVoting: true,
        allowComments: true,
      },
      _id: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const BoardModel = model<Board>("Board", boardSchema);

export default BoardModel;
