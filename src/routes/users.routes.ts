import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { updatedUserRequestSchema } from "../schemas/users.schemas";
import {
   createUserController,
   getUserByIdController,
   updateUserController,
} from "../controllers/users.controllers";
import { checkEmailAllReadyExistsMiddlewares } from "../middlewares/checkEmailAllreadyExists.middlewares";
import ensureTokenIsValidMiddlewares from "../middlewares/ensureTokenIsValid.middlewares";
import { ensureUserIsAllowed } from "../middlewares/ensureUserIsAllowed copy";

const userRoutes: Router = Router();

userRoutes.post(
   "",

   checkEmailAllReadyExistsMiddlewares,
   createUserController
);
userRoutes.get("/:id", getUserByIdController);
userRoutes.patch('/:id', ensureTokenIsValidMiddlewares, ensureUserIsAllowed , checkEmailAllReadyExistsMiddlewares, ensureDataIsValidMiddleware(updatedUserRequestSchema),updateUserController)

export default userRoutes;
