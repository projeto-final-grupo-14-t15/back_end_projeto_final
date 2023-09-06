import { Router } from "express";
import {
   createAnnouncementController,
   listAnnouncementController,
   deleteAnnouncementController,
   updateAnnouncementController,
   filterAnnouncementController,
   getAllUserAnnouncements,
   createCommentAnnouncements,
   getCommentsByAnnouncement,
   updateComment,
   deleteComment,
   listCommentById,
} from "../controllers/announcements.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { announcementSchemaUpadate } from "../schemas/announcements.schemas";
import { checkAnnouncementExistByIdMiddlewares } from "../middlewares/checkAnnouncementsExistById.middlewares";
import { checkIsOwnerAnnoucemntsMiddlewares } from "../middlewares/userIsOwnerAnnoucement.middlewares";
import ensureTokenIsValidMiddlewares from "../middlewares/ensureTokenIsValid.middlewares";
import { commentSchemaRequest } from "../schemas/commentAnnouncements.schemas";
import { checkCommentOwner } from "../middlewares/isUserCommentOwner.middleware";

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


announcementRoutes.get("/byannouncer/:id", getAllUserAnnouncements);

announcementRoutes.post(
   "/:id/comment",
   ensureTokenIsValidMiddlewares,
   ensureDataIsValidMiddleware(commentSchemaRequest),
   createCommentAnnouncements
);
announcementRoutes.get("/:id/comment", getCommentsByAnnouncement);

announcementRoutes.patch(
   "/comment/:commentId",
   ensureTokenIsValidMiddlewares,
   checkCommentOwner,
   updateComment
);
announcementRoutes.delete(
   "/comment/:commentId",
   ensureTokenIsValidMiddlewares,
   checkCommentOwner,
   deleteComment
);

announcementRoutes.get("/comment/:id", listCommentById);

export default announcementRoutes;
