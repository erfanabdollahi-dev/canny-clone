import express from "express";
import { createBoard, getBoardBySlug, getBoards, updateBoard } from "./board.controller.js";

const router = express.Router();

router.get("/", getBoards);
router.post("/", createBoard);
router.get("/:slug", getBoardBySlug);
router.patch('/:id', updateBoard)
export default router;
