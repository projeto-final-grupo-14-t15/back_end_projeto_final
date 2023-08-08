import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import {
  TAnnouncementRequest,
  TAnnouncementUpdate,
} from "../../interfaces/announcements.interfaces";
import { Announcement } from "../../entities/announcements.entitie";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error";

const updateAnnouncementService = async (
  announcementData: TAnnouncementUpdate,
  idUser: number,
  idAnnouncement: number
): Promise<Announcement> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const usertoken = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  if (!usertoken) {
    throw new AppError(`User with id ${idUser} not found.`, 404);
  }

  const oldAnnouncement = await announcementRepository.findOne({
    where: { id: idAnnouncement },
    relations: ["user"],
  });

  if (!oldAnnouncement) {
    throw new AppError(
      `Announcement with id ${idAnnouncement} not found.`,
      404
    );
  }

  const userOwnerAnnoucement = oldAnnouncement.user;

  if (usertoken.id !== userOwnerAnnoucement.id) {
    throw new AppError(
      `You don't have permission to edit this announcement.`,
      403
    );
  }

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
