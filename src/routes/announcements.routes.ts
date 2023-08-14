import { Router } from "express";
import {
   createAnnouncementController,
   listAnnouncementController,
   deleteAnnouncementController,
   updateAnnouncementController,
   filterAnnouncementController,
   getAllUserAnnouncements,
} from "../controllers/announcements.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import {
   announcementSchemaRequest,
   announcementSchemaUpadate,
} from "../schemas/announcements.schemas";
import { checkAnnouncementExistByIdMiddlewares } from "../middlewares/checkAnnouncementsExistById.middlewares";
import { checkIsOwnerAnnoucemntsMiddlewares } from "../middlewares/userIsOwnerAnnoucement.middlewares";
import ensureTokenIsValidMiddlewares from "../middlewares/ensureTokenIsValid.middlewares";

const announcementRoutes: Router = Router();

announcementRoutes.post(
   "",
   ensureTokenIsValidMiddlewares,
   createAnnouncementController
);

announcementRoutes.get("/:id", listAnnouncementController);

announcementRoutes.patch(
   "/:id",
   ensureTokenIsValidMiddlewares,
   ensureDataIsValidMiddleware(announcementSchemaUpadate),
   checkAnnouncementExistByIdMiddlewares,
   checkIsOwnerAnnoucemntsMiddlewares,
   updateAnnouncementController
);

announcementRoutes.delete(
   "/:id",
   ensureTokenIsValidMiddlewares,
   checkAnnouncementExistByIdMiddlewares,
   deleteAnnouncementController
);

announcementRoutes.get("", filterAnnouncementController);

announcementRoutes.get("/byannouncer/:id", getAllUserAnnouncements)

export default announcementRoutes;
