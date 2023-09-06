import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Comment } from "../../../entities/comment.entitie";
import { AppError } from "../../../error/error";

const getCommentsByIdService = async (commentId: number) => {
   const commentRepository: Repository<Comment> =
      AppDataSource.getRepository(Comment);

   const comment = await commentRepository.findOne({
      where: {
         id: commentId,
      },
   });

   if (!comment) {
      throw new AppError(`No comments found with id ${commentId}.`, 404);
   }

   return comment;
};

export { getCommentsByIdService };
