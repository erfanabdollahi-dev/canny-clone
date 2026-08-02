import type { Request, Response } from "express";
import authService from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  // Store this hashedPassword in your database as user.password
  const loginData = loginSchema.parse(req.body);
  const data = await authService.login(loginData);
  return res.json({ message: "Login successful", data: data });
};

export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);

  const user = await authService.register(data);

  return res.status(201).json({
    message: "User registered successfully",
    data: user,
  });
};
