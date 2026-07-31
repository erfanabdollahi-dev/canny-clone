import { Schema, model } from "mongoose";
import type { BoardType } from "./board.types.js";

const boardSchema = new Schema(
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

const Board = model<BoardType>("Board", boardSchema);

export default Board;
