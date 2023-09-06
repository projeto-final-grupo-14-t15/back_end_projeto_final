import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Photo } from "../../entities/photos.entitie";

const updatePhotoService = async (
   announcementId: number,
   newPhotoUrls: string[]
): Promise<void> => {
   const photoRepository: Repository<Photo> =
      AppDataSource.getRepository(Photo);

   const existingPhotos = await photoRepository.find({
      where: {
         announcement: { id: announcementId },
      },
   });

   await Promise.all(
      existingPhotos.map((photo) => photoRepository.delete(photo.id))
   );

   await Promise.all(
      newPhotoUrls.map(async (photoUrl) => {
         const newPhoto: Photo = photoRepository.create({
            link: photoUrl,
            announcement: { id: announcementId },
         });
         await photoRepository.save(newPhoto);
      })
   );
};

export { updatePhotoService };
