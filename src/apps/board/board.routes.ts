import express from "express";
import {
  createBoard,
  deleteBoard,
  getBoardBySlug,
  getBoards,
  updateBoard,
} from "./board.controller.js";
import { requireAdmin } from "@/middlewares/role.middleware.js";

const router = express.Router();

router.get("/", getBoards);
router.post("/", requireAdmin ,createBoard);
router.get("/:slug", getBoardBySlug);
router.patch("/:id", requireAdmin ,updateBoard);
router.delete("/:id", requireAdmin ,deleteBoard);
export default router;
