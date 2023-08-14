import { z } from "zod";

const photoSchema = z.object({
   id: z.number(),
   link: z.string().max(255),
   createdAt: z.string(),
   updatedAt: z.string(),
});

const photoSchemaRequest = photoSchema.omit({
   id: true,
   createdAt: true,
   updatedAt: true,
});

const photoSchemaResponse = photoSchema;

const photosSchemaResponse = z.array(photoSchemaResponse);

export {
   photoSchema,
   photoSchemaResponse,
   photosSchemaResponse,
   photoSchemaRequest,
};
