import { z } from "zod";
import {
  userInfoSchema,
  userSchema,
  userSchemaRequest,
  userSchemaRequestDois,
  userSchemaResponse,
} from "../schemas/users.schemas";

type TUser = z.infer<typeof userSchema>;

type TUserRequest = z.infer<typeof userSchemaRequest>;

type TUserResponse = z.infer<typeof userSchemaResponse>;

type TUserRequestDois = z.infer<typeof userSchemaRequestDois>;

type TUserInfo = z.infer<typeof userInfoSchema>;

export { TUser, TUserRequest, TUserResponse, TUserRequestDois,TUserInfo };
