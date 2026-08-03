import PostModel from "./post.model.js";
import type { CreatePostInput, Post, UpdatePostInput } from "./post.types.js";

class PostRepository {
  async findAll(): Promise<Post[]> {
    const posts = await PostModel.find()
      .populate("author", "full_name email")
      .populate("board", "title slug")
      .lean();
    return posts;
  }

  async create(data: CreatePostInput): Promise<Post> {
    const post = await PostModel.create(data);
    return post?.toObject();
  }

  async findById(id: string): Promise<Post | undefined> {
    const post = await PostModel.findById(id).populate("author", "full_name email").populate("board", "title slug")
    return post?.toObject();
  }

  async updateById(id: string, data: Partial<Post>): Promise<Post | undefined> {
    const post = await PostModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });

    return post?.toObject();
  }

  async deleteById(id: string): Promise<Post | undefined> {
    const post = await PostModel.findByIdAndDelete(id);
    return post?.toObject();
  }

  async updateVoteCount(postId: string, amount : 1 | -1) {
    return await PostModel.findByIdAndUpdate(
      postId,
      { $inc: { voteCount: amount } },
      { returnDocument : 'after'},
    ).lean();
  }
  async updateCommentCount(postId: string, amount : 1 | -1) {
    return await PostModel.findByIdAndUpdate(
      postId,
      { $inc: { commentCount: amount } },
      {  returnDocument : 'after' },
    ).lean();
  }

}

export default new PostRepository();
