import BoardModel from "./board.model.js";
import slugify from "@/utils/slugify.js";
import { AppError } from "@/error/app-error.js";
import boardRepository from "./board.repository.js";
import type { Board, CreateBoardInput, UpdateBoardInput } from "./board.types.js";

class BoardService {


  // getting all the boards
  async getBoards(): Promise<Board[]> {
    return await boardRepository.findAll();
  }


  async createBoard(input: CreateBoardInput): Promise<Board> {
    const slug = slugify(input.title);
    const exists = await boardRepository.findBySlug(slug);
    if (exists) {
      throw new AppError("Board already exists!", 400);
    }
    
    const board = await boardRepository.create({
      ...input,
      slug,
    });
    if (!board) {
      throw new AppError("Board was not created ", 400);
    }
    return board;
  }


  async getBoardBySlug(slug: string): Promise<Board> {
    const board = await boardRepository.findBySlug(slug);
    if (board) {
      return board;
    }
    throw new AppError("Board does not exists!", 404);
  }

  async updateBoard(id: string, data: UpdateBoardInput): Promise<Board> {
    const board = await boardRepository.updateById(id, data);
    if (!board) {
      throw new AppError("Board does not exist", 404);
    }
    return board;
  }


  async deleteBoard(id: string) {
    const board = await boardRepository.deleteById(id);
    if (!board) {
      throw new AppError("Board does not exist", 404);
    }
    return board;
  }
}

export default new BoardService();
