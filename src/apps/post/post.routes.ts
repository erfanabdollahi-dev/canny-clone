import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "./post.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/",authMiddleware, createPost);
router.patch("/:id",authMiddleware, updatePost);
router.delete("/:id",authMiddleware, deletePost);
export default router;
