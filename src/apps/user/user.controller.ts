import type { Request, Response } from "express";
import userService from "./user.service.js";
import { createUserSchema } from "./user.validation.js";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  return res.json({ message: "Users retrieved successfully", data: users });
};

export const createUser = async (req: Request, res: Response) => {
  const data = createUserSchema.parse(req.body);
  const user = await userService.createUser(data);
  return res
    .status(201)
    .json({ message: "User created successfully", data: user });
};
