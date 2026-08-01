import postRepository from "./post.repository.js";
import type { PostType } from "./post.types.js";

class PostService {
  async getPosts(): Promise<PostType[]> {
    const posts = await postRepository.findAll()
    return posts;
  }
}

export default new PostService();
