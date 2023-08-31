import { Repository } from "typeorm";
import { Comment } from "../../../entities/comment.entitie";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../error/error";

const deleteCommentService = async (
   commentId: number
) => {
   const commentRepository: Repository<Comment> =
      AppDataSource.getRepository(Comment);

    const comment = await commentRepository.findOne({
        where: {
           id: commentId,
        },
    });

   if (!comment) {
      throw new AppError(`Comment with id ${commentId} not found.`, 404);
   }

   await commentRepository.remove(comment);
};

export { deleteCommentService };