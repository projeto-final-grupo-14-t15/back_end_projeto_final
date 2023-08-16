import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcements.entitie";
import { announcementSchemaResponse, announcementsAllSchemaResponse } from "../../schemas/announcements.schemas";
import { TPagination } from "../../interfaces/announcements.interfaces";

const listAnnouncementService = async (
   page: number,
   itemsPerPage: number,
   serverUrl: string
): Promise<TPagination> => {
   const pageP: string | null = page - 1 < 1 ? null : `${serverUrl}/adverts/?page=${page - 1}&perpage=${itemsPerPage}`;
   const nextPage: string | null = `${serverUrl}/announcement/?page=${page + 1}&perpage=${itemsPerPage}`;

   const announcementRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement);

   const [findAndCount, totalCount] = await announcementRepository.createQueryBuilder('announcement')
      .leftJoinAndSelect('announcement.user', 'Users')
      .orderBy('announcement.id', 'ASC')
      .take(itemsPerPage)
      .skip(itemsPerPage * (page - 1))
      .getManyAndCount();

   const totalPages = Math.ceil(totalCount / itemsPerPage);

   const nextAnnouncement = await announcementRepository.find({
      take: itemsPerPage,
      skip: itemsPerPage * page
   });

   
   const parsedAnnouncement = announcementsAllSchemaResponse.parse(findAndCount);

   const pagination: TPagination = {
      currentPage:  pageP,
      nextPage: nextAnnouncement.length > 0 ? nextPage : null,
      totalPages:  totalPages,
      data: parsedAnnouncement
   };

   return pagination;
};

export { listAnnouncementService };
