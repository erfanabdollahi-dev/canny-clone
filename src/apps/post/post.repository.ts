import Post from "./post.model.js";

class PostRepository {
  async findAll() {
    const posts = await Post.find();
    return posts;
  }
}


export default new PostRepository();