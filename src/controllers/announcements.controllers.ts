import { Request, Response } from "express";
import {
   TAnnouncementRequest,
   TAnnouncementResponse,
   TPagination,
} from "../interfaces/announcements.interfaces";
import {
   announcementSchemaRequest,
   announcementSchemaResponse,
   announcementSchemaResponseDois,
} from "../schemas/announcements.schemas";
import { Announcement } from "../entities/announcements.entitie";
import { createAnnouncementService } from "../services/announcements/createAnnouncement.service";
import { listAnnouncementService } from "../services/announcements/listAnnouncement.service";
import { updateAnnouncementService } from "../services/announcements/updateAnnouncement.service";
import deleteAnnouncementService from "../services/announcements/deleteAnnouncement.service";
import { filterAnnouncementService } from "../services/announcements/filterAnnouncement.services";
import { createPhotoService } from "../services/photos/createPhotos.service";
import { Photo } from "../entities/photos.entitie";
import { TPhotoRequest } from "../interfaces/photos.interfaces";
import { AppError } from "../error/error";
import { parse } from "path";

const createAnnouncementController = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const announcementData: TAnnouncementRequest =
      announcementSchemaRequest.parse(req.body);

   const userId = res.locals.token.id;

   const newAnnouncement: Announcement = await createAnnouncementService(
      announcementData,
      userId
   );
   console.log(req.body);
   const response: TAnnouncementResponse =
      announcementSchemaResponse.parse(newAnnouncement);

   const photos = req.body.photos;

   if (!photos) {
      throw new AppError("Photo field not found", 404);
   }

   photos.map(async (photo: string) => {
      const data: TPhotoRequest = { link: photo };

      const newPhoto: Photo = await createPhotoService(data, response.id);
   });

   return res.status(201).json(response);
};
const updateAnnouncementController = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const announcementData = req.body;

   const announcementId = Number(req.params.id);

   const newAnnouncement = await updateAnnouncementService(
      announcementData,
      announcementId
   );

   return res.status(200).json(newAnnouncement);
};

const deleteAnnouncementController = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const announcementId: number = parseInt(req.params.id);
   await deleteAnnouncementService(announcementId);

   return res.status(204).send();
};

const listAnnouncementController = async (
   req: Request,
   res: Response
): Promise<Response> => {

   const serverUrl = `${req.protocol}://${req.get('host')}`;
   const page = req.query.page ? parseInt(req.query.page as string) : 1;
   const itemsPerPage = req.query.pageSize ? parseInt(req.query.pageSize as string) : 12;
  
   const announcement: TPagination = await listAnnouncementService(page, itemsPerPage, serverUrl);

   return res.status(200).json(announcement);
};


const filterAnnouncementController = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const { brand, model, color, year, fuel, minPrice, maxPrice, minKm, maxKm } =
      req.query;

   const listAnnouncement = await filterAnnouncementService(
      brand,
      model,
      color,
      year,
      fuel,
      minPrice,
      maxPrice,
      minKm,
      maxKm
   );

   return res.status(200).json(listAnnouncement);
};

export {
   createAnnouncementController,
   updateAnnouncementController,
   deleteAnnouncementController,
   listAnnouncementController,
   filterAnnouncementController,
};
