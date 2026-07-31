import type { Board } from "./board.types.js";

class BoardService {
  // getting all the boards
  getBoards(): Board[] {
    return [
      {
        title: "Feature Requests",
        description: "Request new features",
        slug: "feature-requests",

        settings: {
          allowVoting: true,
          allowComments: true,
        },
      },
      {
        title: "Feature Requests",
        description: "Request new features",
        slug: "feature-requests",

        settings: {
          allowVoting: true,
          allowComments: true,
        },
      },
    ];
  }
}

export default new BoardService();
