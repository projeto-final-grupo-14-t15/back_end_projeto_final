import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../error/error";
import { User } from "../entities/users.entitie";

const checkEmailAllReadyExistsMiddlewares = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const email: string = req.body.email;

   const UserRepository: Repository<User> = AppDataSource.getRepository(User);

   const userEmailAllReadyExists = await UserRepository.exist({
      where: { email: email },
   });

   if (userEmailAllReadyExists) {
      throw new AppError("Email already in use!", 409);
   }

   return next();
};

export { checkEmailAllReadyExistsMiddlewares };
