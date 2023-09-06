import { z } from "zod";
import { userSchemaRequestDois } from "../schemas/users.schemas";
import {
   photoSchema,
   photoSchemaRequest,
   photoSchemaResponse,
} from "../schemas/photos.schemas";

type TPhoto = z.infer<typeof photoSchema>;
type TPhotoRequest = z.infer<typeof photoSchemaRequest>;
type TPhotoResponse = z.infer<typeof photoSchemaResponse>;

type TUserRequestDois = z.infer<typeof userSchemaRequestDois>;

export { TPhoto, TPhotoRequest, TPhotoResponse, TUserRequestDois };
