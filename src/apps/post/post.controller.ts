import type { Request, Response } from "express";
import postService from "./post.service.js";
import {
  createPostSchema,
  findByIdSchema,
  updatePostSchema,
} from "./post.validation.js";
import type { Post, PostDocument } from "./post.types.js";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getPosts();

  return res.json({ message: "Posts retrieved successfully", data: posts });
};

export const createPost = async (req: Request, res: Response) => {
  const data = createPostSchema.parse(req.body);

  const post = await postService.createPost(data);
  return res
    .status(201)
    .json({ message: "Post created successfully", data: post });
};

export const getPost = async (req: Request, res: Response) => {
  const postId = findByIdSchema.parse(req.params.id);

  const post = await postService.getPostById(postId);

  return res.json({ message: "Post retieved successfully", data: post });
};

export const updatePost = async (req: Request, res: Response) => {
  const postId = findByIdSchema.parse(req.params.id);
  const data : Partial<Post> = updatePostSchema.parse(req.body);
  const post = await postService.updatePostById(postId, data);

  return res.json({ message: "Post updated successfully", data: post });
};
