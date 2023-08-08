import { Request, Response } from "express";
import {
  TAnnouncementRequest,
  TAnnouncementResponse,
} from "../interfaces/announcements.interfaces";
import {
  announcementSchemaRequest,
  announcementSchemaResponse,
} from "../schemas/announcements.schemas";
import { Announcement } from "../entities/announcements.entitie";
import { createAnnouncementService } from "../services/announcements/createAnnouncement.service";

const createAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const announcementData: TAnnouncementRequest =
    announcementSchemaRequest.parse(req.body);

  const id = res.locals.token.id;

  const newAnnouncement: Announcement = await createAnnouncementService(
    announcementData,
    id
  );

  const response: TAnnouncementResponse =
    announcementSchemaResponse.parse(newAnnouncement);

  return res.status(201).json(response);
};

export { createAnnouncementController };
