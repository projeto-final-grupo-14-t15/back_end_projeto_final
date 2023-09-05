import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Announcement } from "../../../entities/announcements.entitie";
import { User } from "../../../entities/users.entitie";
import { AppError } from "../../../error/error";
import { Comment } from "../../../entities/comment.entitie";
import { TComment } from "../../../interfaces/announcements.interfaces";

const createCommentAnnouncementService = async (
   commentData: TComment,
   idUser: number,
   idAnnoucement: number
) => {
   const userRepository: Repository<User> = AppDataSource.getRepository(User);

   const announcementRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);

   const commentRepository: Repository<Comment> =
      AppDataSource.getRepository(Comment);

   const user = await userRepository.findOne({
      where: {
         id: idUser,
      },
   });

   if (!user) {
      throw new AppError(`User with id ${idUser} not found.`, 404);
   }

   const announcement = await announcementRepository.findOne({
      where: {
         id: idAnnoucement,
      },
   });

   if (!announcement) {
      throw new AppError(
         `Annoucement with id ${idAnnoucement} not found.`,
         404
      );
   }

   const comment = commentRepository.create({
      ...commentData,
      author: user,
      announcement: announcement,
   });

   await commentRepository.save(comment);

   return comment;
};

export { createCommentAnnouncementService };
