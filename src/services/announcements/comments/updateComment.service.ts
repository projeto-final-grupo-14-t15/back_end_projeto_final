import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Comment } from "../../../entities/comment.entitie";
import { AppError } from "../../../error/error";
import { TComment } from "../../../interfaces/announcements.interfaces";

const updateCommentService = async (
   commentId: number,
   updatedData: TComment
) => {
   const commentRepository: Repository<Comment> =
      AppDataSource.getRepository(Comment);

    const comment = await commentRepository.findOne({
        where: {
           id: commentId,
        },
        relations: ["author"]
     });

   if (comment === null || comment === undefined) {
      throw new AppError(`Comment with id ${commentId} not found.`, 404);
   }

   comment.text = updatedData.text; 
   comment.update_date = new Date().toISOString(); 

   const newComment = await commentRepository.save(comment);

   return newComment
};

export { updateCommentService };