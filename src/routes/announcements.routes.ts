import { Router } from "express";
import {
  createAnnouncementController,

  listAnnouncementController,
  deleteAnnouncementController,
  updateAnnouncementController,
} from "../controllers/announcements.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid";
import {
  announcementSchemaRequest,
  announcementSchemaUpadate,
} from "../schemas/announcements.schemas";
import ensureTokenIsValid from "../middlewares/ensureTokenIsValid";
import { checkAnnouncementExistById } from "../middlewares/checkAnnouncementsExistById";

const announcementRoutes: Router = Router();

announcementRoutes.post(
  "",
  ensureTokenIsValid,
  ensureDataIsValidMiddleware(announcementSchemaRequest),
  createAnnouncementController
);

announcementRoutes.get("/:id", listAnnouncementController);


announcementRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureDataIsValidMiddleware(announcementSchemaUpadate),
  updateAnnouncementController
);

announcementRoutes.delete(
  "/:id",
  ensureTokenIsValid,
  checkAnnouncementExistById,
  deleteAnnouncementController
);

export default announcementRoutes;
