import { ObjectId } from "mongodb";
import type { BoardType } from "./board.types.js";
import Board from "./board.model.js";

class BoardService {
  // getting all the boards
  async getBoards(): Promise<BoardType[]> {
    return Board.find();
  }
}

export default new BoardService();
