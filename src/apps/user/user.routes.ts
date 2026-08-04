import express from "express";
import {
  createUser,
  deleteUser,
  getMe,
  getUser,
  getUsers,
  updateUser,
} from "./user.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
/**
 * @openapi
 * /users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user
 *     description: Returns the profile information of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user retrieved successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.get("/me", authMiddleware, getMe);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
