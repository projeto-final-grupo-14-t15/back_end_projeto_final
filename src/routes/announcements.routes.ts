import { Router } from "express";
import { createAnnouncementController } from "../controllers/announcements.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid";
import { announcementSchemaRequest } from "../schemas/announcements.schemas";
import ensureTokenIsValid from "../middlewares/ensureTokenIsValid";

const announcementRoutes: Router = Router();

announcementRoutes.post(
  "",
  ensureTokenIsValid,
  ensureDataIsValidMiddleware(announcementSchemaRequest),
  createAnnouncementController
);
export default announcementRoutes;
