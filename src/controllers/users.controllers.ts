import { Request, Response } from "express";
import {
   TUser,
   TUserInfo,
   TUserRequest,
   TUserRequestDois,
   TUserResponse,
} from "../interfaces/users.interfaces";
import {
   updatedUserRequestSchema,
   userSchema,
   userSchemaRequest,
   userSchemaRequestDois,
   userSchemaResponse,
} from "../schemas/users.schemas";
import { User } from "../entities/users.entitie";
import { createUserService } from "../services/users/createUser.service";
import { getUserInfo } from "../services/users/getUserInfoWithId.service";
import { updateUserService } from "../services/users/updateUser.service";

const createUserController = async (
   req: Request,
   res: Response
): Promise<Response> => {
   if (req.body.isAdmin == "true") {
      req.body.isAdmin = true;
   } else if (req.body.isAdmin == "false") {
      req.body.isAdmin = false;
   }
   const userData: TUserRequest = userSchemaRequest.parse(req.body);

   const newUser: User = await createUserService(userData);

   const response: TUserRequestDois = userSchemaRequestDois.parse(newUser);

   return res.status(201).json(response);
};

const getUserByIdController = async (
   req: Request,
   res: Response
): Promise<Response> => {
   const userId = Number(req.params.id);

   const userInfo: TUserInfo = await getUserInfo(userId);

   return res.status(200).json(userInfo);
};

const updateUserController = async(req:Request, res:Response):Promise<Response> =>{

   const userData = req.body;
   const userId = Number(req.params.id)

   const updatedUser = await updateUserService(userId,userData);

   const returnUser = updatedUserRequestSchema.parse(updatedUser[0]) 
   

   return res.status(200).json(returnUser)
} 

export { createUserController, getUserByIdController, updateUserController };
