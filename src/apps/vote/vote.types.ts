import type { HydratedDocument, InferSchemaType, Types } from "mongoose";
import type { voteSchema } from "./vote.model.js";
import type z from "zod";
import type { createVoteSchema } from "./vote.validation.js";


export type CreateDeleteVoteInput = z.infer<typeof createVoteSchema>;
export type FindVoteInput = z.infer<typeof createVoteSchema>;
export type VoteSchema = InferSchemaType<typeof voteSchema>
export type Vote = VoteSchema & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type VoteDocument = HydratedDocument<Vote>