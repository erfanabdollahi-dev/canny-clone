import { AppError } from "@/error/app-error.js";
import boardRepository from "../board/board.repository.js";
import postRepository from "./post.repository.js";
import type { CreatePostInput, Post, UpdatePostInput } from "./post.types.js";

class PostService {
  async getPosts(): Promise<Post[]> {
    return await postRepository.findAll();
  }

  async createPost(data: CreatePostInput): Promise<Post> {
    const board = await boardRepository.findById(data.board_id);
    if (!board) {
      throw new AppError("Board not found", 404);
    }

    return await postRepository.create(data);
  }

  async getPostById(id: string): Promise<Post> {
    const post = await postRepository.findById(id);

    if (post) return post;

    throw new AppError("Post not found", 404);
  }

  async updatePostById(
    id: string,
    data: UpdatePostInput,
  ): Promise<Post> {
    const post = await postRepository.updateById(id, data);
    if (post) return post;
    throw new AppError("Post not found", 404);
  }

  async deletePostById(id: string): Promise<Post> {
    const post = await postRepository.deleteById(id);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    return post;
  }
}

export default new PostService();
