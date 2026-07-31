import type { Request, Response } from "express";
import boardService from "./board.service.js";
import type { BoardCreateType } from "./board.types.js";
import { createBoardSchema } from "./board.validation.js";

export const getBoards = async (req: Request, res: Response) => {
  const boards = await boardService.getBoards();

  return res.json(boards);
};

export const createBoard = async (
  req: Request,
  res: Response,
) => {

  const inputData = createBoardSchema.parse(req.body);

  const board = await boardService.createBoard(inputData);

  return res.status(201).json(board);
};
