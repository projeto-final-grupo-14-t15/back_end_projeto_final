import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcements.entitie";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error/error";
import { Photo } from "../../entities/photos.entitie";
import { TPhoto, TPhotoRequest } from "../../interfaces/photos.interfaces";

const updatePhotoService = async (
   announcementId: number,
   newPhotoUrls: string[]
): Promise<void> => {
   const photoRepository: Repository<Photo> = AppDataSource.getRepository(Photo);

   const existingPhotos = await photoRepository.find({
      where: {
         announcement: { id: announcementId },
      },
   });

   // Delete existing photos
   await Promise.all(existingPhotos.map(photo => photoRepository.delete(photo.id)));

   // Create new photos
   await Promise.all(newPhotoUrls.map(async photoUrl => {
      const newPhoto: Photo = photoRepository.create({
         link: photoUrl,
         announcement: { id: announcementId },
      });
      await photoRepository.save(newPhoto);
   }));
};

export { updatePhotoService };
