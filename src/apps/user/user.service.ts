import { AppError } from "@/error/app-error.js";
import userRepository from "./user.repository.js";
import type {
  CreateUserInput,
  PublicUser,
  UpdateUserInput,
} from "./user.types.js";

class UserService {
  async getUsers(): Promise<PublicUser[]> {
    const users = await userRepository.findAll();
    const publicUsers = users.map((user) => {
      const { password, ...publicUser } = user;
      return publicUser;
    });
    return publicUsers;
  }

  async createUser(data: CreateUserInput): Promise<PublicUser | undefined> {
    // check if user with email exists
    const existingUser = await userRepository.findByEmail(data.email);
    console.log(existingUser);

    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }
    const user = await userRepository.create(data);
    if (user) {
      const { password, ...publicUser } = user;
      return publicUser;
    }

    throw new AppError("User was not created", 400);
  }

  async getUser(id: string): Promise<PublicUser> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const { password, ...PublicUser } = user;
    return PublicUser;
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const user = await userRepository.updateById(id, data);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const { password, ...PublicUser } = user;
    return PublicUser;
  }
}

export default new UserService();
