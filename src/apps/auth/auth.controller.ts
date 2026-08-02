import type { Request, Response } from "express";
import authService from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import bcrypt from "bcrypt"


export const login = async (req: Request, res : Response) => {
  const hashedPassword = await bcrypt.hash("erfan1387", 10);
  console.log(hashedPassword)
// Store this hashedPassword in your database as user.password
  const loginData = loginSchema.parse(req.body)
  const data = await authService.login(loginData)
  return res.json({message : "Login successful", data : data})
}