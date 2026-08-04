import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "./post.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { toggleVote } from "../vote/vote.controller.js";
import { createComment, getComments } from "../comment/comment.controller.js";
import upload from "@/middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id/comments", getComments);
router.post("/:id/comments", authMiddleware, createComment);

router.get("/:id", getPost);
router.post("/",authMiddleware,upload.single("image"), createPost);
router.patch("/:id",authMiddleware, updatePost);
router.delete("/:id",authMiddleware, deletePost);
router.post('/:id/vote', authMiddleware, toggleVote);



export default router;
