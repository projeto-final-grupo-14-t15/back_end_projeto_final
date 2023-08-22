import { z } from "zod";
import { photosSchemaResponse } from "./photos.schemas";
import { userSchemaResponse, } from "./users.schemas";

const announcementSchema = z.object({
   id: z.number(),
   brand: z.string().max(55),
   description: z.string().max(255),
   model: z.string().max(55),
   year: z.string().max(4),
   km: z.number(),
   fuel: z.string().max(55),
   color: z.string().max(55),
   higherThanFipe: z.boolean(),
   price: z.number(),
   isActive: z.boolean().default(true),
   createdAt: z.string(),
   updatedAt: z.string(),
   photos: photosSchemaResponse,
});

const announcementSchemaRequest = announcementSchema.omit({
   id: true,
   createdAt: true,
   photos: true,
   updatedAt: true,
});

const announcementSchemaResponse = announcementSchema.omit({
   photos: true,
});

const announcementSchemaResponseDois = z.object({
   id: z.number(),
   brand: z.string().max(55),
   description: z.string().max(255),
   model: z.string().max(55),
   year: z.string().max(4),
   km: z.string(),
   fuel: z.string().max(55),
   color: z.string().max(55),
   higherThanFipe: z.boolean(),
   price: z.string(),
   isActive: z.boolean().default(true),
   createdAt: z.string(),
   updatedAt: z.string(),
   photos: photosSchemaResponse,
   user: userSchemaResponse
});

const announcementSchemaUpadate = announcementSchemaRequest.partial();

const announcementsSchemaResponse = z.array(announcementSchemaResponse);

export {
   announcementSchema,
   announcementSchemaRequest,
   announcementSchemaResponse,
   announcementsSchemaResponse,
   announcementSchemaUpadate,
   announcementSchemaResponseDois,
};
