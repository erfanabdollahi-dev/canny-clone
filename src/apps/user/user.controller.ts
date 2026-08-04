import type { Request, Response } from "express";
import userService from "./user.service.js";
import {
  createUserSchema,
  findByIdSchema,
  updateUserSchema,
} from "./user.validation.js";
import type { UpdateUserInput } from "./user.types.js";

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

export const getUser = async (req: Request, res: Response) => {
  const userId = findByIdSchema.parse(req.params.id);
  const user = await userService.getUser(userId);
  return res.json({ message: "User retrieved successfully", data: user });
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = findByIdSchema.parse(req.params.id);
  const data = updateUserSchema.parse(req.body);

  const user = await userService.updateUser(userId, data);
  return res.json({ message: "User updated successfully", data: user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = findByIdSchema.parse(req.params.id);

  await userService.deleteUser(userId);

  return res.json({
    message: "User deleted successfully",
  });
};

export const getMe = async  (
  req: Request,
  res: Response
) => {
  
  return res.json({
    message: "Current user retrieved successfully",
    data: req.user,
  });
};