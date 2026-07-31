import type { Request, Response } from "express";
import boardService from "./board.service.js";

export const getBoards = async (req: Request, res: Response) => {
  const boards = await boardService.getBoards();

  return res.json(boards);
};
