import { z } from "zod";
import {
  userSchema,
  userSchemaRequest,
  userSchemaRequestDois,
  userSchemaResponse,
} from "../schemas/users.schemas";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserResponse = z.infer<typeof userSchemaResponse>;

type TUserRequestDois = z.infer<typeof userSchemaRequestDois>;

export { TUser, TUserRequest, TUserResponse, TUserRequestDois };
