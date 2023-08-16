import { z } from "zod";
import {
  announcementSchema,
  announcementSchemaRequest,
  announcementSchemaResponse,
  announcementSchemaUpadate,
  announcementsAllSchemaResponse,
} from "../schemas/announcements.schemas";
import exp from "constants";

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
  higher_than_fipe?: boolean;
  price?: number;
};
// z.infer<typeof announcementSchemaUpadate>;

type TAnnouncementResponse = z.infer<typeof announcementSchemaResponse>;
type TannouncementsAllSchemaResponse = z.infer<typeof announcementsAllSchemaResponse>;

type TPagination = {
  data: TannouncementsAllSchemaResponse;
  currentPage: string | null;
  totalPages: number;
  nextPage: string | null;
};

export {
  TPagination,
  TAnnouncement,
  TAnnouncementRequest,
  TAnnouncementResponse,
  TAnnouncementUpdate,
  TannouncementsAllSchemaResponse,
};
