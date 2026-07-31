import type { Board } from "./board.types.js";

class BoardService {
  // getting all the boards
  getBoards(): Board[] {
    return [
      {
        name: "Feature Requests",
        slug: "feature-requests",
      },
      {
        name: "Event Requests",
        slug: "event-requests",
      },
    ];
  }
}

export default new BoardService();
