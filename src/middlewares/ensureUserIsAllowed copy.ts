import { NextFunction, Response, Request } from "express"
import "dotenv/config";
import { AppError } from "../error/error";
import { Repository } from "typeorm";
import { User } from "../entities/users.entitie";
import { AppDataSource } from "../data-source";

export const ensureUserIsAllowed = async (req:Request, res:Response, next:NextFunction) :Promise<Response | void> =>{

    const userId = res.locals.token.id;
    const paramId:string = req.params.id

    const userRepository:Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    
    const isAdmin = user!.isAdmin

    if(isAdmin === false && userId != paramId){
        throw new AppError("Insufficient permission", 403)
    }
    
    return next();
}