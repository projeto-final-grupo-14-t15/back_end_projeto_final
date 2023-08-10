import { Request, Response } from "express";
import {
   TAnnouncementRequest,
   TAnnouncementResponse,
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

   return res.status(201).json(response);
};
const updateAnnouncementController = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const announcementData = req.body;

   const userId = res.locals.token.id;
   const announcementId = Number(req.params.id);

   const newAnnouncement /*: Announcement*/ = await updateAnnouncementService(
      announcementData,
      userId,
      announcementId
   );

   // const response: TAnnouncementResponse =
   //   announcementSchemaResponse.parse(newAnnouncement);

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
   const userId: number = Number(req.params.id);

   const response = await listAnnouncementService(userId);

   const parsedResponse: TAnnouncementResponse =
      announcementSchemaResponseDois.parse(response);

   return res.status(200).json(parsedResponse);
};

const filterAnnouncementController = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const { brand, model, color, year, fuel, minPrice, maxPrice, minKm, maxKm } =
      req.query;
   console.log(minKm)
   
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
