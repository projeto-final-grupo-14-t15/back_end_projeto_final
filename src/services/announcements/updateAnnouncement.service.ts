import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import {
   TAnnouncementRequest,
   TAnnouncementUpdate,
} from "../../interfaces/announcements.interfaces";
import { Announcement } from "../../entities/announcements.entitie";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error/error";

const updateAnnouncementService = async (
   announcementData: TAnnouncementUpdate,
   idAnnouncement: number
): Promise<Announcement> => {
   const announcementRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);

   const oldAnnouncement = (await announcementRepository.findOne({
      where: { id: idAnnouncement },
      relations: ["user"],
   })) as Announcement;

   const updatedAnnouncement: Announcement = {
      ...oldAnnouncement,
      ...announcementData,
   };

   const newAnnouncement = await announcementRepository.save(
      updatedAnnouncement
   );

   return newAnnouncement;
};

export { updateAnnouncementService };
