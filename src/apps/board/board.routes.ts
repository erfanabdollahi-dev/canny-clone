import express from "express";
import { createBoard, getBoardBySlug, getBoards } from "./board.controller.js";

const router = express.Router();

router.get("/", getBoards);
router.post("/", createBoard);
router.get("/:slug", getBoardBySlug);
export default router;
