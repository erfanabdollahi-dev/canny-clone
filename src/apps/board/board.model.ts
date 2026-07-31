import { Schema, model } from "mongoose";
import type { Board } from "./board.types.js";

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
      allowVoting: {
        type: Boolean,
        required: true,
        default: true,
      },
      allowComments: {
        type: Boolean,
        required: true,
        default: true,
      },
      default : {}
    },
  },
  {
    timestamps: true,
  },
);

const Board = model<Board>("Board", boardSchema);

export default Board;
