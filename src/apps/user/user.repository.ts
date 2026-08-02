import UserModel from "./user.model.js";
import type { User } from "./user.types.js";

class UserRepository {
  async findAll(): Promise<User[]> {
    return await UserModel.find().lean();
  }
}

export default new UserRepository();
