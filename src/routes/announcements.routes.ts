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
} from "../controllers/announcements.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import {
   announcementSchemaRequest,
   announcementSchemaUpadate,
} from "../schemas/announcements.schemas";
import { checkAnnouncementExistByIdMiddlewares } from "../middlewares/checkAnnouncementsExistById.middlewares";
import { checkIsOwnerAnnoucemntsMiddlewares } from "../middlewares/userIsOwnerAnnoucement.middlewares";
import ensureTokenIsValidMiddlewares from "../middlewares/ensureTokenIsValid.middlewares";
import { commentSchemaRequest } from "../schemas/commentAnnouncements.schemas";

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

announcementRoutes.get("/byannouncer/:id", getAllUserAnnouncements);

announcementRoutes.post(
   "/:id/comment",
   ensureTokenIsValidMiddlewares,
   ensureDataIsValidMiddleware(commentSchemaRequest),
   createCommentAnnouncements
);
announcementRoutes.get(
   "/:id/comment",
   getCommentsByAnnouncement
);
announcementRoutes.patch(
   "/:id/comment/:commentId",
   updateComment
);
announcementRoutes.delete(
   "/:id/comment/:commentId",
   deleteComment
);

export default announcementRoutes;
