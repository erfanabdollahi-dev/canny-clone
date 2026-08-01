import type { Request, Response } from "express";
import boardService from "./board.service.js";
import type { BoardCreateType } from "./board.types.js";
import {
  createBoardSchema,
  findByIdSchema,
  findBySlugSchema,
  updateBoardSchema,
} from "./board.validation.js";

export const getBoards = async (req: Request, res: Response) => {
  const boards = await boardService.getBoards();

  return res.json(boards);
};

export const createBoard = async (req: Request, res: Response) => {
  const inputData = createBoardSchema.parse(req.body);

  const board = await boardService.createBoard(inputData);

  return res.status(201).json(board);
};

export const getBoardBySlug = async (req: Request, res: Response) => {
  const slug = findBySlugSchema.parse(req.params.slug);
  const board = await boardService.getBoardBySlug(slug);
  return res.status(200).json(board);
};

export const updateBoard = async (req: Request, res: Response) => {
  const data = updateBoardSchema.parse(req.body);
  const boardId = findByIdSchema.parse(req.params.id);
  const board = await boardService.updateBoard(boardId, data);
  return res.status(200).json(board)
};
