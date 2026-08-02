import userRepository from "./user.repository.js";
import type { PublicUser } from "./user.types.js";

class UserService {
  async getUsers(): Promise<PublicUser[]> {
    const users = await userRepository.findAll();
    const publicUsers = users.map((user) => {
      const { password, ...publicUser } = user;
      return publicUser;
    });
    return publicUsers;
  }
}

export default new UserService();
