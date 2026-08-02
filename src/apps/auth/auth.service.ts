import bcrypt from "bcrypt";
import userRepository from "../user/user.repository.js";
import { AppError } from "@/error/app-error.js";
import type { LoginInput, RegisterInput } from "./auth.types.js";
import jwt from "jsonwebtoken";
import env from "@/config/env.js";

class AuthService {
  async login(loginData: LoginInput) {
    // check if the user with this email is exists
    const user = await userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatches = await bcrypt.compare(
      loginData.password,
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

  async register(registerData: RegisterInput) {
    // check if email exist
    const emailExist = await userRepository.findByEmail(registerData.email);
    if (emailExist) {
      throw new AppError("Email already exists", 409);
    }

    try {
      // hash the password
      const hashedPassword = await bcrypt.hash(registerData.password, 12);

      const userData = {
        ...registerData,
        password: hashedPassword,
      };

      const user = await userRepository.create(userData);
      const { password, ...publicUser } = user;
      return publicUser;
    } catch {
      throw new AppError("Error while creating a user", 500);
    }
  }
}

export default new AuthService();
