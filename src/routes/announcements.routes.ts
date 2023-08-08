import { Router } from "express";
import {
  createAnnouncementController,
  updateAnnouncementController,
} from "../controllers/announcements.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid";
import {
  announcementSchemaRequest,
  announcementSchemaUpadate,
} from "../schemas/announcements.schemas";
import ensureTokenIsValid from "../middlewares/ensureTokenIsValid";

const announcementRoutes: Router = Router();

announcementRoutes.post(
  "",
  ensureTokenIsValid,
  ensureDataIsValidMiddleware(announcementSchemaRequest),
  createAnnouncementController
);

announcementRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureDataIsValidMiddleware(announcementSchemaUpadate),
  updateAnnouncementController
);

export default announcementRoutes;
