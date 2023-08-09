import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcements.entitie";

const deleteAnnouncementService = async (Id: number): Promise<void> => {
    await AppDataSource.getRepository(Announcement)
    .createQueryBuilder("announcements")
    .where("announcements.id = :id", { id: Id })
    .delete()
    .execute();
};

export default deleteAnnouncementService;
