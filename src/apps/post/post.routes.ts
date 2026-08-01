import express from "express";
import { getPosts } from "./post.controller.js";

const router = express.Router();

router.get("/", getPosts);

export default router;
