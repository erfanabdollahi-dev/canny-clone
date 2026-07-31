import { ObjectId } from "mongodb";
import type { BoardType, BoardCreateType } from "./board.types.js";
import Board from "./board.model.js";
import slugify from "@/utils/slugify.js";

class BoardService {
  // getting all the boards
  async getBoards(): Promise<BoardType[]> {
    return await Board.find();
  }

  async createBoard(input: BoardCreateType): Promise<BoardType> {
    if (!input.title) throw new Error("title not provided");
    const slug = slugify(input.title);

    const board = await Board.create({
      ...input,
      slug,
    });
    console.log(board);
    return board;
  }
}

export default new BoardService();
