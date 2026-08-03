import express from "express";
import { deleteComment, updateComment } from "./comment.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
