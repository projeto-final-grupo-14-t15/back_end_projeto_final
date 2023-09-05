import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TAnnouncementRequest } from "../../interfaces/announcements.interfaces";
import { Announcement } from "../../entities/announcements.entitie";

export const getAllUserAnnouncementsService = async (
   userId: number
): Promise<TAnnouncementRequest[]> => {
   const announcementRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);

   const announcements: TAnnouncementRequest[] = await announcementRepository
      .createQueryBuilder("announcement")
      .where("announcement.user.id = :userId", { userId: userId })
      .leftJoinAndSelect("announcement.photos", "photos")
      .getMany();

   return announcements;
};
