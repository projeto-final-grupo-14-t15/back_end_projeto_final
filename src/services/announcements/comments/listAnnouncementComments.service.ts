import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Comment } from "../../../entities/comment.entitie";
import { AppError } from "../../../error/error";

const getCommentsByAnnouncementService = async (
   announcementId: number
) => {
   const commentRepository: Repository<Comment> =
      AppDataSource.getRepository(Comment);

   const comments = await commentRepository.find({
      where: {
         announcement: {
            id: announcementId
         }
      },
      relations: ["author"],
   });

   if (!comments || comments.length === 0) {
      throw new AppError(
         `No comments found for announcement with id ${announcementId}.`,
         404
      );
   }

   return comments;
};

export { getCommentsByAnnouncementService };