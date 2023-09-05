import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Comment } from "../entities/comment.entitie";
import { AppError } from "../error/error";
import { NextFunction, Request, Response } from "express";

const checkCommentOwner = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const commentRepository: Repository<Comment> =
      AppDataSource.getRepository(Comment);

   const commentId = Number(req.params.commentId);

   const comment = await commentRepository.findOne({
      where: {
         id: commentId,
      },
      relations: ["author"],
   });

   if (!comment) {
      throw new AppError(`Comment with id ${commentId} not found.`, 404);
   }

   if (Number(comment.author.id) !== Number(res.locals.token.id)) {
      throw new AppError(
         `Comment with id ${commentId} do not belong to you!`,
         409
      );
   }

   return next();
};

export { checkCommentOwner };
