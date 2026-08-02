import VoteModel from "./vote.model.js";
import type { Vote } from "./vote.types.js";



class VoteRepository {

  async findByUserAndPost( userId: string, postId: string) : Promise<Vote | null>{
    return await VoteModel.findOne({user : userId, post : postId}).lean()
  }

  async create( userId: string, postId: string) : Promise<Vote>{
    const vote = await VoteModel.create({user : userId, post: postId})
    return vote.toObject()
  }

  async deleteByUserAndPost( userId: string, postId: string): Promise<Vote | null>{
    return await VoteModel.findOneAndDelete({
                              user: userId,
                              post: postId,}).lean()
  }

 

}


export default new VoteRepository;