import bcrypt from "bcrypt";
import userRepository from "../user/user.repository.js";
import { AppError } from "@/error/app-error.js";
import type { LoginInput, RegisterInput } from "./auth.types.js";
import jwt from "jsonwebtoken";
import env from "@/config/env.js";

class AuthService {
  async login(data: LoginInput) {
    // check if the user with this email is exists
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      user.password,
    );
    if (passwordMatches === false) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign({ userId: user._id.toString() }, env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { password, ...publicUser } = user;
    return {
      message: "Login successful",
      token: token,
      user: publicUser,
    };
  }

  async register(data: RegisterInput) {
    // check if email exist
    const emailExist = await userRepository.findByEmail(data.email);
    if (emailExist) {
      throw new AppError("Email already exists", 409);
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const userData = {
      ...data,
      password: hashedPassword,
    };

    const user = await userRepository.create(userData);
    const { password, ...publicUser } = user;
    return publicUser;
  }
}

export default new AuthService();
