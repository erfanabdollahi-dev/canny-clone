import type {
  PaginatedResult,
  PaginationQuery,
} from "@/common/pagination/pagination.types.js";
import PostModel from "./post.model.js";
import {
  PostSortBy,
  type CreatePostInput,
  type Post,
  type PostQuery,
  type PostStatus,
} from "./post.types.js";
import type { QueryFilter, Types } from "mongoose";

class PostRepository {
  async findAll({
    page,
    limit,
    status,
    board,
    sortBy,
    search,
  }: PostQuery): Promise<PaginatedResult<Post>> {
    const filter: QueryFilter<Post> = {};

    if (status) {
      filter.status = status;
    }
    if (board) {
      filter.board = board;
    }
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    const total = await PostModel.countDocuments(filter);
    const skip = (page - 1) * limit;
    const pages = Math.ceil(total / limit);
    let sort = {};

    switch (sortBy) {
      case PostSortBy.NEWEST:
        sort = { createdAt: -1 };
        break;

      case PostSortBy.OLDEST:
        sort = { createdAt: 1 };
        break;

      case PostSortBy.VOTES:
        sort = { voteCount: -1 };
        break;
      default:
        sort = { createdAt: -1 }
        break;
    }
    const posts = await PostModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("author", "full_name")
      .populate("board", "title slug")
      .lean();
    return { data: posts, pagination: { page, total, limit, pages } };
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
