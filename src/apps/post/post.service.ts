import { AppError } from "@/error/app-error.js";
import boardRepository from "../board/board.repository.js";
import postRepository from "./post.repository.js";
import type { CreatePostInput, Post, PostQuery, UpdatePostInput } from "./post.types.js";
import type { PaginatedResult } from "@/common/pagination/pagination.types.js";
import env from "@/config/env.js";
import VoteModel from "../vote/vote.model.js";
import type { Types } from "mongoose";

class PostService {
  // helper
  private async getOwnedPost(userId: string, postId: string): Promise<Post> {
    const post = await postRepository.findById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if (post.author._id.toString() !== userId) {
      throw new AppError("You are not allowed to perform this action.", 403);
    }

    return post;
  }

  async getPosts(query: PostQuery, userId?: string): Promise<PaginatedResult<Post>> {
    const response = await postRepository.findAll(query);
    const posts = response.data
    const postIds = response.data.map((post) => post._id);
    const votes = userId ? await VoteModel.find({
      user: userId,
      post: { $in: postIds }
    }).select("post") : []
    
    const votedPostIds = new Set(
      votes.map((vote) => vote.post.toString()),
    );

    const postsWithVoteStatus = posts.map((post) => ({
      ...post,

      hasVoted: votedPostIds.has(
        post._id.toString(),
      ),
    }));
    return {
      ...response,
      data: postsWithVoteStatus,
    };
  }

  async createPost(data: CreatePostInput, userId: string): Promise<Post> {
    const board = await boardRepository.findById(data.board);
    if (!board) {
      throw new AppError("Board not found", 404);
    }
    const postData = {
      ...data,
      author: userId,
      image: `${env.SERVER_URL}/${data.image}`
    };
    return await postRepository.create(postData);
  }

  async getPostById(id: string): Promise<Post> {
    const post = await postRepository.findById(id);

    if (post) return post;

    throw new AppError("Post not found", 404);
  }

  async updatePostById(
    userId: string,
    postId: string,
    data: UpdatePostInput,
  ): Promise<Post> {
    // check if the post exist and the owner of the post is updating
    await this.getOwnedPost(userId, postId);

    const updatedPost = await postRepository.updateById(postId, data);

    if (!updatedPost) {
      throw new AppError("Faild to update the post", 500);
    }
    return updatedPost;
  }

  async deletePostById(userId: string, postId: string): Promise<Post> {
    // check if the post exist and the owner of the post is updating
    await this.getOwnedPost(userId, postId);
    const deletedPost = await postRepository.deleteById(postId);
    if (!deletedPost) {
      throw new AppError("Post not found", 404);
    }
    return deletedPost;
  }
}

export default new PostService();
