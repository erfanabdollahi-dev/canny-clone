import { ObjectId } from "mongodb";
import type { BoardType, BoardInputType } from "./board.types.js";
import Board from "./board.model.js";
import slugify from "@/utils/slugify.js";
import { AppError } from "@/error/app-error.js";
import BoardRepository from "./board.repository.js";

class BoardService {
  // getting all the boards
  async getBoards(): Promise<BoardType[]> {
    return await BoardRepository.findAll();
  }

  async createBoard(input: BoardInputType): Promise<BoardType> {
    const slug = slugify(input.title);

    const exists = await Board.findOne({ slug });
    if (exists) {
      throw new AppError("Board already exists!", 400);
    }

    const board = await BoardRepository.create({
      ...input,
      slug,
    });

    console.log(board);
    return board;
  }

  async getBoardBySlug(slug: string): Promise<BoardType> {
    const board = await BoardRepository.findBySlug(slug);
    if (board) {
      return board.toObject();
    }
    throw new AppError("Board does not exists!", 404);
  }
}

export default new BoardService();
