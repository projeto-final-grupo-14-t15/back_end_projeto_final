import { z } from "zod";
import {
  announcementSchema,
  announcementSchemaRequest,
  announcementSchemaResponse,
} from "../schemas/announcements.schemas";
import exp from "constants";

type TAnnouncement = z.infer<typeof announcementSchema>;

type TAnnouncementRequest = z.infer<typeof announcementSchemaRequest>;

type TAnnouncementResponse = z.infer<typeof announcementSchemaResponse>;

export { TAnnouncement, TAnnouncementRequest, TAnnouncementResponse };
