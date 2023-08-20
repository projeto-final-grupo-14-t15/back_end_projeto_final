import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entitie";
import { Repository } from "typeorm";
import { AppError } from "../error/error";

const checkUserExists = async (req:Request, res: Response, next: NextFunction) => {
    const reqId = req.params.id;
    
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const findUser: User | null = await userRepo.findOneBy({id:Number(reqId)});

    if(!findUser){
        throw new AppError('User not found', 404);
    };  

    return next();
};

export default checkUserExists