import { ObjectId } from "mongodb";
import type { Board } from "./board.types.js";

class BoardService {
  // getting all the boards
  getBoards(): Board[] {
    const date = new Date();
    return [
      {
        _id : new ObjectId(),
        title: "Feature Requests",
        description: "Request new features",
        slug: "feature-requests",

        settings: {
          allowVoting: true,
          allowComments: true,
        },
        createdAt: date,
        updatedAt: date,
      },
      {
        _id : new ObjectId(),
        title: "Feature Requests",
        description: "Request new features",
        slug: "feature-requests",

        settings: {
          allowVoting: true,
          allowComments: true,
        },
        createdAt: date,
        updatedAt: date,
      },
    ];
  }
}

export default new BoardService();
