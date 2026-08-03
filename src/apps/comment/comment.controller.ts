import type { Request, Response } from "express";
import commentService from "./comment.service.js";
import {
  createCommentInputSchema,
  updateCommentSchema,
} from "./comment.validation.js";
import mongoose from "mongoose";
import { findByIdSchema } from "../post/post.validation.js";

// "get" /id:/comments
export const getComments = async (req: Request, res: Response) => {

  console.log('k')
  
  const postId = findByIdSchema.parse(req.params.id);

  const comments = await commentService.getComments(postId);

  return res.json({
    message: "Comments retrieved successfully",
    data: comments,
  });
};

// "post" /id:/comments
export const createComment = async (req: Request, res: Response) => {
  const postId = findByIdSchema.parse(req.params.id);
  const body = createCommentInputSchema.parse(req.body);

  const comment = await commentService.createComment(
    req.user._id,
    new mongoose.Types.ObjectId(postId),
    body,
  );

  return res.status(201).json({
    message: "Comment created successfully",
    data: comment,
  });
};

// "patch" /comments/:id
export const updateComment = async (req: Request, res: Response) => {
  const commentId = findByIdSchema.parse(req.params.id);
  const body = updateCommentSchema.parse(req.body);

  const comment = await commentService.updateComment(
    commentId,
    req.user._id.toString(),
    body,
  );

  return res.json({
    message: "Comment updated successfully",
    data: comment,
  });
};

// "delete" /comments/:id
export const deleteComment = async (req: Request, res: Response) => {
  const commentId = findByIdSchema.parse(req.params.id);

  await commentService.deleteComment(commentId, req.user._id.toString());

  return res.json({
    message: "Comment deleted successfully",
  });
};
