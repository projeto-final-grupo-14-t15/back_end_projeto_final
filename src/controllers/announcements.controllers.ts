import { Request, Response } from "express";
import {
   TAnnouncementRequest,
   TAnnouncementResponse,
} from "../interfaces/announcements.interfaces";
import {
   announcementSchema,
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
import { getAllUserAnnouncementsService } from "../services/announcements/getAllUserAnnoucements.service";

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
   const announcementId: number = Number(req.params.id);

   const response = await listAnnouncementService(announcementId);

   console.log('AQUI ESTÁ A RESPONSE ANTES DO PARSE!!!!!!')
   console.log(response)
   console.log('AQUI ESTÁ A RESPONSE ANTES DO PARSE!!!!!!')

   const parsedResponse: TAnnouncementResponse = announcementSchemaResponseDois.parse(response);

   return res.status(200).json(response);
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

const getAllUserAnnouncements = async (req: Request, res: Response): Promise<Response> => {

   const userId = Number(req.params.id);
 
   const userAnnouncements: TAnnouncementRequest[] = await getAllUserAnnouncementsService(userId);
 
   return res.status(200).json(userAnnouncements);
};

export {
   createAnnouncementController,
   updateAnnouncementController,
   deleteAnnouncementController,
   listAnnouncementController,
   filterAnnouncementController,
   getAllUserAnnouncements
};

