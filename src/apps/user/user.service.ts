import { AppError } from "@/error/app-error.js";
import userRepository from "./user.repository.js";
import type { PublicUser } from "./user.types.js";
import type { CreateUserInput } from "./user.validation.js";

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
}

export default new UserService();
