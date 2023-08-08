import { z } from "zod";
import { photosSchemaResponse } from "./photos.schemas";

const announcementSchema = z.object({
  id: z.number(),
  brand: z.string().max(55),
  description: z.string().max(255),
  model: z.string().max(55),
  year: z.string().max(4),
  km: z.string().max(55),
  fuel: z.string().max(55),
  color: z.string().max(55),
  higher_than_fipe: z.boolean(),
  price: z.string().max(55),
  createdAt: z.string(),
  updated_at: z.string(),
  photos: photosSchemaResponse,
});

const announcementSchemaRequest = announcementSchema.omit({
  id: true,
  createdAt: true,
  photos: true,
  updated_at: true,
});

const announcementSchemaResponse = announcementSchema.omit({
  photos: true,
});

const announcementsSchemaResponse = z.array(announcementSchemaResponse);

export {
  announcementSchema,
  announcementSchemaRequest,
  announcementSchemaResponse,
  announcementsSchemaResponse,
};
