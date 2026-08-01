import type { Request, Response } from "express";
import postService from "./post.service.js";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getPosts();

  return res.json({ message: "Posts retrieved successfully", data: posts });
};
