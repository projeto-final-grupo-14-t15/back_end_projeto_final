import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

import { AppError } from "../../error/error";
import { Announcement } from "../../entities/announcements.entitie";
import { announcementSchemaResponseDois } from "../../schemas/announcements.schemas";

const listAnnouncementService = async (
   announcementId: number
): Promise<any> => {
   const announcementRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);

   const announcement: Announcement | null =
      await announcementRepository.findOne({
         where: {
            id: announcementId,
         },
         relations: {
            photos: true,
            user: true,
            comments: true,
         },
      });

   if (!announcement) {
      throw new AppError("Announcement not found", 404);
   }

   return announcement;
};
export { listAnnouncementService };
