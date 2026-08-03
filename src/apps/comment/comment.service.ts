import { AppError } from "@/error/app-error.js";
import postRepository from "../post/post.repository.js";
import commentRepository from "./comment.repository.js";
import type {
  Comment,
  CreateCommentInput,
  UpdateCommentInput,
} from "./comment.types.js";
import type { Types } from "mongoose";
import type { PaginatedResult, PaginationQuery } from "@/common/pagination/pagination.types.js";

class CommentService {
  // ----- helper function -----
  private async getOwnedComment(
    userId: string,
    commentId: string,
  ): Promise<Comment> {
    const comment = await commentRepository.findById(commentId);

    if (!comment) {
      throw new AppError("Comment not found", 404);
    }

    if (comment.author._id.toString() !== userId) {
      throw new AppError("You are not allowed to perform this action.", 403);
    }

    return comment;
  }

  // ----- get comments -----
  async getComments(postId: string, pagination: PaginationQuery  ): Promise<PaginatedResult<Comment>> {
    // check if post exists
    const post = await postRepository.findById(postId);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    return await commentRepository.findByPostId(postId, -1, pagination);
  }

  // ----- create comment -----
  async createComment(
    userId: Types.ObjectId,
    postId: Types.ObjectId,
    data: UpdateCommentInput,
  ): Promise<Comment> {
    // check if post exists
    const post = await postRepository.findById(postId.toString());
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const comment = await commentRepository.create({
    author: userId,
    post: postId,
    content: data.content,
  });
    await postRepository.updateCommentCount(postId.toString(), 1);

    return comment;
  }

  // ----- update comment -----
  async updateComment(
    commentId: string,
    userId: string,
    data: UpdateCommentInput,
  ): Promise<Comment> {
    // check if comment exists
    await this.getOwnedComment(userId, commentId);
    const updatedComment = await commentRepository.updateById(commentId, data);
    if (!updatedComment) {
      throw new AppError("Failed to update comment", 500);
    }
    return updatedComment;
  }

  // ----- delete comment -----
  async deleteComment(commentId: string, userId: string): Promise<Comment> {
    const comment = await this.getOwnedComment(userId, commentId);
    const deletedComment = await commentRepository.deleteById(commentId);
    await postRepository.updateCommentCount(comment.post.toString(), -1);
    if (!deletedComment) {
      throw new AppError("Failed to delete comment", 500);
    }

    return deletedComment;
  }
}

export default new CommentService();
