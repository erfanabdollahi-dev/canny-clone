import { AppError } from "@/error/app-error.js";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "@/config/env.js";
import userRepository from "@/apps/user/user.repository.js";

interface JwtPayLoad extends jwt.JwtPayload {
  userId: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new AppError("Unauthorized", 401);
  }
  if (!authorization.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  try {
    const jwtToken = jwt.verify(token, env.JWT_SECRET) as JwtPayLoad;
    const user = await userRepository.findById(jwtToken.userId);
    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    req.user = user
    
    next();
  } catch {
    throw new AppError("Unauthorized", 401);
  }
};
