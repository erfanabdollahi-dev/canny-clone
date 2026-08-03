import CommentModel from "./comment.model.js";
import type {
  Comment,
  CreateCommentInput,
  UpdateCommentInput,
} from "./comment.types.js";

class CommentRepository {
  async findByPostId(id: string, sort : 1 | -1 = -1): Promise<Comment[]> {
    return await CommentModel.find({ post: id })
      .sort({
        createdAt: sort,
      })
      .lean();
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
