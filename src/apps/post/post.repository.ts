import Post from "./post.model.js";
import type { PostInputType } from "./post.types.js";

class PostRepository {
  async findAll() {
    const posts = await Post.find();
    return posts;
  }

  async create(data: PostInputType) {
    const post = await Post.create(data);
    return post?.toObject();
  }

  async findById(id : string){
    const post = await Post.findById(id)
    
    
    return post?.toObject();
  }
}

export default new PostRepository();
