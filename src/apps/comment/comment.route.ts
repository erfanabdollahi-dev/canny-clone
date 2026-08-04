import express from "express";
import { deleteComment, updateComment } from "./comment.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";

const router = express.Router();
/**
 * @openapi
 * /comments/{id}:
 *   patch:
 *     tags:
 *       - Comments
 *     summary: Update a comment
 *     description: Updates an existing comment.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f123abc456def789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             content: Updated comment text
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.patch("/:id", authMiddleware, updateComment);
/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete a comment
 *     description: Deletes an existing comment.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f123abc456def789
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.delete("/:id", authMiddleware, deleteComment);

export default router;
