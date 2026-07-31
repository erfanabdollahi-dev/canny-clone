import type { Request, Response } from "express";
import boardService from "./board.service.js";

export const getBoards = (req: Request, res: Response) => {
  return res.json(boardService.getBoards());
};
