import { AppError } from "@/error/app-error.js";
import boardRepository from "../board/board.repository.js";
import postRepository from "./post.repository.js";
import type { PostInputType, PostType } from "./post.types.js";
import { isValidObjectId } from "mongoose";

class PostService {
  async getPosts(): Promise<PostType[]> {
    const posts = await postRepository.findAll();
    return posts;
  }

  async createPost(data: PostInputType): Promise<PostType> {

    const board = await boardRepository.findById(data.board_id);
    if (!board) {
      throw new AppError("Board not found", 404);
    }
    
    const post = await postRepository.create(data);
    return post;
  }
}

export default new PostService();
