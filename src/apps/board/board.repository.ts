import BoardModel from "./board.model.js";
import type { Board, CreateBoardInput, CreateBoardRepo, UpdateBoardInput } from "./board.types.js";


class BoardRepository {


  async findAll() : Promise<Board[]>  {
    const boards = await BoardModel.find().lean();
    return boards;
  }


  async create(data: CreateBoardRepo): Promise<Board | undefined>  {
    const board = await BoardModel.create(data);
    return board?.toObject();
  }


  async findBySlug(slug: string) : Promise<Board | undefined>  {
    const board = await BoardModel.findOne({ slug });
    return board?.toObject();
  }


  async findById(id: string) : Promise<Board | undefined>  {
    const board = await BoardModel.findById(id);
    return board?.toObject();
  }


  async updateById(id: string, data: UpdateBoardInput) : Promise<Board | undefined> {
    const board = await BoardModel.findByIdAndUpdate(id, data, { new: true });
    return board?.toObject();
  }


  async deleteById(id: string) : Promise<Board | undefined>  {
    const board = await BoardModel.findByIdAndDelete(id);
    return board?.toObject();
  }
}

export default new BoardRepository();
