import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../error/error";
import { Announcement } from "../entities/announcements.entitie";

const checkIsOwnerAnnoucemntsMiddlewares = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const userId = Number(res.locals.token.id);
   const announcementId = Number(req.params.id);

   const announcementRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);

   const announcement = (await announcementRepository.findOne({
      where: { id: announcementId },
      relations: ["user"],
   })) as Announcement;

   const userOwnerAnnoucement = announcement.user;

   if (userId !== userOwnerAnnoucement.id) {
      throw new AppError(
         `You don't have permission to edit this announcement.`,
         403
      );
   }

   return next();
};

export { checkIsOwnerAnnoucemntsMiddlewares };
