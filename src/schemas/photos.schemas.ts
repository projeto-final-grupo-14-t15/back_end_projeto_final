import { z } from "zod";

const photoSchema = z.object({
   id: z.number(),
   link: z.string().max(255),
   createdAt: z.string(),
   updated_at: z.string(),
});

const photoSchemaRequest = photoSchema.omit({
   id: true,
   createdAt: true,
   updated_at: true,
});

const photoSchemaResponse = photoSchema;

const photosSchemaResponse = z.array(photoSchemaResponse);

export {
   photoSchema,
   photoSchemaResponse,
   photosSchemaResponse,
   photoSchemaRequest,
};
