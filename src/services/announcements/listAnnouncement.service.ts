import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

import { AppError } from "../../error";
import { Announcement } from "../../entities/announcements.entitie";

const listAnnouncementService = async (
  announcementId: number
): Promise<Announcement> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const announcement: Announcement | null =
    await announcementRepository.findOne({
      where: {
        id: announcementId,
      },
      relations: {
        photos: true,
      },
    });

  if (!announcement) {
    throw new AppError("Announcement not found", 404);
  }

  return announcement;
};
export { listAnnouncementService };
