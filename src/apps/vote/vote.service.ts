import { AppError } from "@/error/app-error.js";
import postRepository from "../post/post.repository.js";
import voteRepository from "./vote.repository.js";

class VoteService {
  async toggleVote(userId: string, postId: string) {
    // find and check if post exist

    const post = await postRepository.findById(postId);
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    // check if the user has already voted
    // if yes delete the vote if not create the vote and incrase or decrease the post voteCount
    const existingVote = await voteRepository.findByUserAndPost(userId, postId);
    if (existingVote) {
      await voteRepository.deleteByUserAndPost(userId, postId);
      const updatedPost = await postRepository.updateVoteCount(postId, -1);

      return {
        voted: false,
        voteCount: updatedPost!.voteCount,
      };
    }

    await voteRepository.create(userId, postId);
    const updatedPost = await postRepository.updateVoteCount(postId, 1);

    return {
      voted: true,
      voteCount: updatedPost!.voteCount,
    };
  }
}

export default new VoteService();
