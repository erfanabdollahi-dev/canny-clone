import type { Types } from "mongoose";
import Board from "./board.model.js";
import type {
  BoardCreateType,
  BoardUpdateType,
} from "./board.types.js";

class BoardRepository {
  async findAll() {
    const boards = await Board.find();
    return boards;
  }
  async create(data: BoardCreateType) {
    const board = await Board.create(data);
    return board?.toObject();
  }
  async findBySlug(slug: string) {
    const board = await Board.findOne({ slug });

    return board?.toObject();
  }
  async updateById(id: string, data: Partial<BoardUpdateType>) {
    const board = await Board.findByIdAndUpdate(id, data, { new: true });
    return board?.toObject();
  }

  async deleteById(id: string) {
    const board = await Board.findByIdAndDelete(id);
    return board?.toObject();
  }
  async findById(id: Types.ObjectId) {
    const board = await Board.findById(id);
    return board;
  }
}

export default new BoardRepository();
