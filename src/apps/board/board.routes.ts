import express from "express";
import { createBoard, getBoards } from "./board.controller.js";

const router = express.Router();

router.get("/", getBoards);
router.post("/", createBoard);

export default router;
