import { z } from "zod";

const photoSchema = z.object({
  id: z.number(),
  link: z.string().max(255),
  createdAt: z.string(),
  updated_at: z.string(),
});

const photoSchemaResponse = photoSchema.omit({
  id: true,
});

const photosSchemaResponse = z.array(photoSchemaResponse);

export { photoSchema, photoSchemaResponse, photosSchemaResponse };
