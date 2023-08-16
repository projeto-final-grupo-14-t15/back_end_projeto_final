import { Router } from "express";
import {
   createAnnouncementController,
   listAnnouncementController,
   deleteAnnouncementController,
   updateAnnouncementController,
   filterAnnouncementController,
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

announcementRoutes.get("/filter", filterAnnouncementController);
announcementRoutes.get("/", listAnnouncementController);

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


export default announcementRoutes;
