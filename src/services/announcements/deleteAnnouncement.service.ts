import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcements.entitie";
import { Photo } from "../../entities/photos.entitie";

const deleteAnnouncementService = async (Id: number): Promise<void> => {
   const photoRepository: Repository<Photo> =
      AppDataSource.getRepository(Photo);

   const existingPhotos = await photoRepository.find({
      where: {
         announcement: { id: Id },
      },
   });

   await Promise.all(
      existingPhotos.map((photo) => photoRepository.delete(photo.id))
   );

   await AppDataSource.getRepository(Announcement)
      .createQueryBuilder("announcements")
      .where("announcements.id = :id", { id: Id })
      .delete()
      .execute();
};

export default deleteAnnouncementService;
