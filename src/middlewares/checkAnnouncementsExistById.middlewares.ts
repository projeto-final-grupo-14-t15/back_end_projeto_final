import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Announcement } from "../entities/announcements.entitie";
import { AppDataSource } from "../data-source";
import { AppError } from "../error/error";

const checkAnnouncementExistByIdMiddlewares = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const id: number = parseInt(req.params.id);

   const AnnouncementRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);

   const AnnouncementExistById = await AnnouncementRepository.exist({
      where: { id: id },
   });

   if (!AnnouncementExistById) {
      throw new AppError("Announcement not found", 404);
   }

   return next();
};

export { checkAnnouncementExistByIdMiddlewares };
