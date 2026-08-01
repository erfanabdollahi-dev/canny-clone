import PostModel from "./post.model.js";
import type { PostInputType } from "./post.types.js";

class PostRepository {
  async findAll() {
    const posts = await PostModel.find();
    return posts;
  }

  async create(data: PostInputType) {
    const post = await PostModel.create(data);
    return post?.toObject();
  }

  async findById(id : string){
    const post = await PostModel.findById(id)
    return post?.toObject();
  }
}


export default new PostRepository();
