import { z } from "zod";
import { userInfoSchema } from "./users.schemas";
import {
   announcementSchemaResponseDois,
} from "./announcements.schemas";

const authonSchema = userInfoSchema.omit({ address: true });
const announcementForCommentSchema = announcementSchemaResponseDois.omit({
   user: true,
   photos: true,
});

const commentSchema = z.object({
   id: z.number(),
   text: z.string().max(255),
   author: authonSchema,
   announcement: announcementForCommentSchema,
   publication_date: z.string(),
   update_date: z.string(),
});

const commentSchemaRequest = commentSchema.omit({
   id: true,
   author: true,
   announcement: true,
   publication_date: true,
   update_date: true,
});

const updateCommentSchema = commentSchemaRequest.extend({}).partial();

export { commentSchemaRequest, commentSchema, updateCommentSchema };
