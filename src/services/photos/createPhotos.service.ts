import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcements.entitie";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error/error";
import { Photo } from "../../entities/photos.entitie";
import { TPhoto, TPhotoRequest } from "../../interfaces/photos.interfaces";

const createPhotoService = async (
   photos: TPhotoRequest,
   id: number
): Promise<Photo> => {
   const announcementRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);

   const photoRepository: Repository<Photo> =
      AppDataSource.getRepository(Photo);

   const announce = await announcementRepository.findOne({
      where: {
         id: id,
      },
   });

   if (!announce) {
      throw new AppError(`Announce with id ${id} not found.`, 404);
   }

   const photo: Photo = photoRepository.create({
      ...photos,
      announcement: announce,
   });

   await photoRepository.save(photo);

   return photo;
};

export { createPhotoService };
