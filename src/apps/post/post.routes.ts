import express from "express";
import { createPost, getPost, getPosts } from "./post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPost);
export default router;
