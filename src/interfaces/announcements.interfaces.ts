import { z } from "zod";
import {
  announcementSchema,
  announcementSchemaRequest,
  announcementSchemaResponse,
  announcementSchemaUpadate,
} from "../schemas/announcements.schemas";
import exp from "constants";

type TAnnouncement = z.infer<typeof announcementSchema>;

type TAnnouncementRequest = z.infer<typeof announcementSchemaRequest>;

type TAnnouncementUpdate = {
  brand?: string;
  description?: string;
  model?: string;
  year?: string;
  km?: string;
  fuel?: string;
  color?: string;
  higher_than_fipe?: boolean;
  price?: string;
};
// z.infer<typeof announcementSchemaUpadate>;

type TAnnouncementResponse = z.infer<typeof announcementSchemaResponse>;

export {
  TAnnouncement,
  TAnnouncementRequest,
  TAnnouncementResponse,
  TAnnouncementUpdate,
};
