import express from "express";
import {
  createBoard,
  deleteBoard,
  getBoardBySlug,
  getBoards,
  updateBoard,
} from "./board.controller.js";

const router = express.Router();

router.get("/", getBoards);
router.post("/", createBoard);
router.get("/:slug", getBoardBySlug);
router.patch("/:id", updateBoard);
router.delete("/:id", deleteBoard);
export default router;
