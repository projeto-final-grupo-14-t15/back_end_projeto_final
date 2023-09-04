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
   announcementSchemaUpadate,
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
import { updatePhotoService } from "../services/photos/updatePhotos.service";
import { createCommentAnnouncementService } from "../services/announcements/comments/createCommentAnnoucement.service";
import {
   commentSchema,
   commentSchemaRequest,
} from "../schemas/commentAnnouncements.schemas";
import { getCommentsByAnnouncementService } from "../services/announcements/comments/listAnnouncementComments.service";
import { deleteCommentService } from "../services/announcements/comments/deleteComment.service";
import { updateCommentService } from "../services/announcements/comments/updateComment.service";
import { getCommentsByIdService } from "../services/announcements/comments/listCommentById";

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

   const fullResponse = await listAnnouncementService(response.id);

   const parsedResponse = announcementSchemaResponseDois.parse(fullResponse);

   return res.status(201).json(parsedResponse);
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

   if (announcementData.photos) {
      await updatePhotoService(newAnnouncement.id, announcementData.photos);
   }

   const parsedResponse = announcementSchemaUpadate.parse(newAnnouncement);

   return res.status(200).json(parsedResponse);
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

   // const parsedResponse = announcementSchemaResponseDois.parse(response);

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

const getAllUserAnnouncements = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const userId = Number(req.params.id);

   const userAnnouncements: TAnnouncementRequest[] =
      await getAllUserAnnouncementsService(userId);

   return res.status(200).json(userAnnouncements);
};

const createCommentAnnouncements = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const commentData = req.body;

   const userId = res.locals.token.id;

   const announcementId: number = Number(req.params.id);

   const response = await createCommentAnnouncementService(
      commentData,
      userId,
      announcementId
   );

   const parsedResponse = commentSchema.parse(response);

   return res.status(201).json(parsedResponse);
};

const getCommentsByAnnouncement = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const announcementId: number = Number(req.params.id);

   const comments = await getCommentsByAnnouncementService(announcementId);

   return res.status(200).json(comments);
};

const updateComment = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const commentId: number = Number(req.params.commentId);
   const updatedData = req.body;

   const updatedComment = await updateCommentService(commentId, updatedData);

   return res.status(201).json(updatedComment);
};

const deleteComment = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const commentId: number = Number(req.params.commentId);

   await deleteCommentService(commentId);

   return res.status(204).send();
};

const listCommentById = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const commentId: number = Number(req.params.id);

   const comment = await getCommentsByIdService(commentId);

   return res.status(200).json(comment);
};

export {
   createAnnouncementController,
   updateAnnouncementController,
   deleteAnnouncementController,
   listAnnouncementController,
   filterAnnouncementController,
   getAllUserAnnouncements,
   createCommentAnnouncements,
   getCommentsByAnnouncement,
   updateComment,
   deleteComment,
   listCommentById,
};
