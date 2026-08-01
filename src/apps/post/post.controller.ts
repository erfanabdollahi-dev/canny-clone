import type { Request, Response } from "express";
import postService from "./post.service.js";
import { createPostSchema } from "./post.validation.js";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getPosts();

  return res.json({ message: "Posts retrieved successfully", data: posts });
};

export const createPost = async (req: Request, res: Response) => {
  const data = createPostSchema.parse(req.body);

  const post = await postService.createPost(data);
  return res.status(201).json({ message: "Post created successfully", data: post })
};
