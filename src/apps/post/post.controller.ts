import type { Request, Response } from "express";
import postService from "./post.service.js";
import {
  createPostSchema,
  findByIdSchema,
  postQuerySchema,
  updatePostSchema,
} from "./post.validation.js";
import type { UpdatePostInput } from "./post.types.js";

export const getPosts = async (req: Request, res: Response) => {

  const query =  postQuerySchema.parse(req.query)
  const posts = await postService.getPosts(query);

  return res.json({ message: "Posts retrieved successfully", data: posts });
};

export const createPost = async (req: Request, res: Response) => {
  const data = createPostSchema.parse(req.body);

  const post = await postService.createPost(data, req.user._id.toString());
  return res
    .status(201)
    .json({ message: "Post created successfully", data: post });
};

export const getPost = async (req: Request, res: Response) => {
  const postId = findByIdSchema.parse(req.params.id);

  const post = await postService.getPostById(postId);

  return res.json({ message: "Post retrieved successfully", data: post });
};

export const updatePost = async (req: Request, res: Response) => {
  const postId = findByIdSchema.parse(req.params.id);
  const data: UpdatePostInput = updatePostSchema.parse(req.body);

  const post = await postService.updatePostById(req.user._id.toString(),postId, data);
  console.log(req.user);
  
  return res.json({ message: "Post updated successfully", data: post });
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = findByIdSchema.parse(req.params.id);
  await postService.deletePostById(req.user._id.toString(), postId);
  return res.json({ message: "Post deleted successfully" });
};
