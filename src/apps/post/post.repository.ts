import type { PaginatedResult, PaginationQuery } from "@/common/pagination/pagination.types.js";
import PostModel from "./post.model.js";
import type { CreatePostInput, Post } from "./post.types.js";


class PostRepository {
  async findAll({
    page,
    limit,
  }: PaginationQuery): Promise<PaginatedResult<Post>> {
    const skip = (page - 1) * limit;
    const total = await  PostModel.countDocuments();
    const pages = Math.ceil(total / limit);

    const posts = await PostModel.find()
      .skip(skip)
      .limit(limit)
      .populate("author", "full_name email")
      .populate("board", "title slug")
      .lean();

    return { data : posts, pagination : {page ,total, limit, pages }};
  }


  async create(data: CreatePostInput): Promise<Post> {
    const post = await PostModel.create(data);
    return post?.toObject();
  }

  async findById(id: string): Promise<Post | undefined> {
    const post = await PostModel.findById(id)
      .populate("author", "full_name email")
      .populate("board", "title slug");
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

  async updateVoteCount(postId: string, amount: 1 | -1) {
    return await PostModel.findByIdAndUpdate(
      postId,
      { $inc: { voteCount: amount } },
      { returnDocument: "after" },
    ).lean();
  }
  async updateCommentCount(postId: string, amount: 1 | -1) {
    return await PostModel.findByIdAndUpdate(
      postId,
      { $inc: { commentCount: amount } },
      { returnDocument: "after" },
    ).lean();
  }
}

export default new PostRepository();
