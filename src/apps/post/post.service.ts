import { AppError } from "@/error/app-error.js";
import boardRepository from "../board/board.repository.js";
import postRepository from "./post.repository.js";
import type { PostDocument, PostInputType } from "./post.types.js";
import { isValidObjectId } from "mongoose";

class PostService {
  async getPosts(): Promise<PostDocument[]> {
    const posts = await postRepository.findAll();
    return posts;
  }

  async createPost(data: PostInputType): Promise<PostDocument> {
    const board = await boardRepository.findById(data.board_id);
    if (!board) {
      throw new AppError("Board not found", 404);
    }

    const post = await postRepository.create(data);
    return post;
  }

  async getPostById(id: string) {
    const post = await postRepository.findById(id);

    if (post) return post;

    throw new AppError("Post does not exist", 404);
  }
}

export default new PostService();
