import type { Request, Response } from "express";
import { findByIdSchema } from "./vote.validation.js";
import voteService from "./vote.service.js";

export const toggleVote = async (req: Request, res: Response) => {
  const postId = findByIdSchema.parse(req.params.id);

  const result = await voteService.toggleVote(req.user._id.toString(), postId);
  return res.json({
    message: result.voted
      ? "Vote added successfully"
      : "Vote removed successfully",
    data: result,
  });
};
