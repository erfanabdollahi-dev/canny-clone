import UserModel from "./user.model.js";
import type { User } from "./user.types.js";
import type { CreateUserInput } from "./user.validation.js";

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
}

export default new UserRepository();
