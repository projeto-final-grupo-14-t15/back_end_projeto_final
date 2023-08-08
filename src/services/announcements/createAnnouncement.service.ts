import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TAnnouncementRequest } from "../../interfaces/announcements.interfaces";
import { Announcement } from "../../entities/announcements.entitie";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error";

const createAnnouncementService = async (
  announcementData: TAnnouncementRequest,
  id: number
): Promise<Announcement> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new AppError(`User with id ${id} not found.`, 404);
  }

  const announcement: Announcement = announcementRepository.create({
    ...announcementData,
    user: user,
  });

  await announcementRepository.save(announcement);

  return announcement;
};

export { createAnnouncementService };
