import bcrypt from "bcrypt";
import userRepository from "../user/user.repository.js";
import { AppError } from "@/error/app-error.js";
import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "./auth.types.js";
import jwt from "jsonwebtoken";
import env from "@/config/env.js";
import crypto from "crypto";
import emailService from "@/services/email/email.service.js";

class AuthService {
  async login(data: LoginInput) {
    // check if the user with this email is exists
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);
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

  async forgotPassword({ email }: ForgotPasswordInput) {
    const user = await userRepository.findByEmail(email);
    // Don't reveal if user exists
    if (!user) {
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await userRepository.updateById(user._id.toString(), {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000),
    });

    emailService.sendPasswordReset(user.email,`${env.FRONTEND_PASSWORD_RESET_URL}/${resetToken}` )

  }

  async resetPassword({ token, password }: ResetPasswordInput) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userRepository.findByResetToken(hashedToken);

    if (!user) {
      throw new AppError("Invalid or expired token", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await userRepository.updatePassword(
      user._id.toString(),
      hashedPassword,
    );

    if (!updatedUser) {
      throw new AppError("Failed to update password", 500);
    }

    return updatedUser
  }
}

export default new AuthService();
