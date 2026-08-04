import type { Request, Response } from "express";
import authService from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import bcrypt from "bcrypt";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.validation.js";


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

export const forgotPassword = async (
  req: Request,
  res: Response
) => {

  const data = forgotPasswordSchema.parse(req.body);

  await authService.forgotPassword(data);

  return res.json({
    message:
      "If this email exists, a password reset link has been sent",
  });
};



export const resetPassword = async (
  req: Request,
  res: Response
) => {
  const data = resetPasswordSchema.parse( {
    password : req.body.password,
    token : req.params.resetToken
  })


  await authService.resetPassword(data);

  return res.json({
    message: "Password changed successfully",
  });
};