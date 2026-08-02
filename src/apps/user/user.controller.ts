import type { Request, Response } from "express";
import userService from "./user.service.js";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  return res.json({ message: "Users retrieved successfully", data: users });
};
