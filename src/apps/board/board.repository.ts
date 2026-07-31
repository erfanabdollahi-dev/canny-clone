import Board from "./board.model.js";
import type { BoardCreateType, BoardType } from "./board.types.js";

class BoardRepository {
  async findAll() {
    const boards = await Board.find();
    return boards;
  }
  async create(data: BoardCreateType) {
    const board = await Board.create(data);
    return board
  }
}

export default new BoardRepository();
