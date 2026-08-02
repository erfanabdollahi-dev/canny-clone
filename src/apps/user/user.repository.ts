import UserModel from "./user.model.js";
import type { CreateUserInput, UpdateUserInput, User } from "./user.types.js";

class UserRepository {
  async findAll(): Promise<User[]> {
    return await UserModel.find().lean();
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = await UserModel.create(data);
    return user.toObject();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email }).lean();
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id).lean();
  }

  async updateById(id: string, data: UpdateUserInput) {
    return await UserModel.findByIdAndUpdate(id, data, {returnDocument : "after"}).lean();
  }
}

export default new UserRepository();
