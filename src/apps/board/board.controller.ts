import type { Request, Response } from "express";
import boardService from "./board.service.js";
import type { BoardCreateType } from "./board.types.js";

export const getBoards = async (req: Request, res: Response) => {
  const boards = await boardService.getBoards();

  return res.json(boards);
};

export const createBoard = async (
  req: Request<{}, {}, BoardCreateType>,
  res: Response,
) => {
  console.log(req.body);
  const board = await boardService.createBoard(req.body);

  return res.status(201).json(board);
};
