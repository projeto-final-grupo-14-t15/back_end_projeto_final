import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/error";

const checkAccountPermision = (req:Request, res: Response, next: NextFunction) => {
    const { admin, id } = res.locals.token;
    const reqId = req.params.id;
    
    if(!admin && Number(id)!== Number(reqId)){
        throw new AppError('Insufficient permission', 403);
    };
        
    return next();
};

export default checkAccountPermision