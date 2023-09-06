import { z } from "zod";
import {
   announcementSchema,
   announcementSchemaRequest,
   announcementSchemaResponse,
} from "../schemas/announcements.schemas";
import {
   commentSchema,
   updateCommentSchema,
} from "../schemas/commentAnnouncements.schemas";

type TAnnouncement = z.infer<typeof announcementSchema>;

type TAnnouncementRequest = z.infer<typeof announcementSchemaRequest>;

type TAnnouncementUpdate = {
   brand?: string;
   description?: string;
   model?: string;
   year?: string;
   km?: number;
   fuel?: string;
   color?: string;
   higherThanFipe?: boolean;
   price?: number;
   isActive?: boolean;
};

type TAnnouncementResponse = z.infer<typeof announcementSchemaResponse>;

type TComment = z.infer<typeof commentSchema>;

type TCommentUpdate = z.infer<typeof updateCommentSchema>;

export {
   TAnnouncement,
   TAnnouncementRequest,
   TAnnouncementResponse,
   TAnnouncementUpdate,
   TComment,
   TCommentUpdate,
   updateCommentSchema,
};
