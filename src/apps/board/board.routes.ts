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
/**
 * @openapi
 * /boards:
 *   get:
 *     tags:
 *       - Boards
 *     summary: Get all boards
 *     description: Returns all available boards.
 *     responses:
 *       200:
 *         description: Boards retrieved successfully
 */
router.get("/", getBoards);
router.post("/", requireAdmin ,createBoard);
/**
 * @openapi
 * /boards/{slug}:
 *   get:
 *     tags:
 *       - Boards
 *     summary: Get board by slug
 *     description: Returns a single board using its slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: feature-requests
 *     responses:
 *       200:
 *         description: Board retrieved successfully
 *       404:
 *         description: Board not found
 */
router.get("/:slug", getBoardBySlug);
router.patch("/:id", requireAdmin ,updateBoard);
router.delete("/:id", requireAdmin ,deleteBoard);
export default router;
