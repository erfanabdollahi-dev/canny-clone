import type { PaginatedResult, PaginationQuery } from "@/common/pagination/pagination.types.js";
import CommentModel from "./comment.model.js";
import type {
  Comment,
  CreateCommentInput,
  UpdateCommentInput,
} from "./comment.types.js";


class CommentRepository {
  async findByPostId(id: string, sort: 1 | -1 = -1,{page, limit} : PaginationQuery): Promise<PaginatedResult<Comment>> {
    const skip = (page - 1) * limit;
    const total = await  CommentModel.countDocuments();
    const pages = Math.ceil(total / limit);
    const comments = await CommentModel.find({ post: id })
      .skip(skip)
      .limit(limit)
      .populate("author", "full_name email")
      .sort({
        createdAt: sort,
      })
      .lean();

      return {data : comments, pagination : {page , total, limit, pages} }
  }


  async findById(id: string): Promise<Comment | null> {
    return await CommentModel.findById(id).lean();
  }

  async create(data: CreateCommentInput): Promise<Comment> {
    const comment = await CommentModel.create(data);
    return comment.toObject();
  }

  async deleteById(id: string): Promise<Comment | null> {
    return await CommentModel.findByIdAndDelete(id).lean();
  }

  async updateById(
    id: string,
    data: UpdateCommentInput,
  ): Promise<Comment | null> {
    return await CommentModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    }).lean();
  }
}

export default new CommentRepository();
