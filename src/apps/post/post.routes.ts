import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  updatePost,
} from "./post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
export default router;
