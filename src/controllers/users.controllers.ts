import { Request, Response } from "express";
import {
   TUserRequest,
   TUserRequestDois,
   TUserResponse,
} from "../interfaces/users.interfaces";
import {
   userSchemaRequest,
   userSchemaRequestDois,
} from "../schemas/users.schemas";
import { User } from "../entities/users.entitie";
import { createUserService } from "../services/users/createUser.service";

const createUserController = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const userData: TUserRequest = userSchemaRequest.parse(req.body);

   const newUser: User = await createUserService(userData);

   const response: TUserRequestDois = userSchemaRequestDois.parse(newUser);

   return res.status(201).json(response);
};
export { createUserController };
