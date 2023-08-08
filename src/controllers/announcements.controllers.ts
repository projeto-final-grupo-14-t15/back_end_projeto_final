import { Request, Response } from "express";
import {
  TAnnouncementRequest,
  TAnnouncementResponse,
  TAnnouncementUpdate,
} from "../interfaces/announcements.interfaces";
import {
  announcementSchemaRequest,
  announcementSchemaResponse,
  announcementSchemaUpadate,
} from "../schemas/announcements.schemas";
import { Announcement } from "../entities/announcements.entitie";
import { createAnnouncementService } from "../services/announcements/createAnnouncement.service";
import { updateAnnouncementService } from "../services/announcements/updateAnnouncement.service";

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

export { createAnnouncementController, updateAnnouncementController };
