import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Comment } from "../../../entities/comment.entitie";
import { AppError } from "../../../error/error";

const updateCommentService = async (
   commentId: number,
   updatedData: any
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

   comment.text = updatedData.text; // Assuming you want to update the 'text' field
   comment.update_date = new Date().toISOString(); // Update the update_date field

   const newComment = await commentRepository.save(comment);

   return newComment
};

export { updateCommentService };