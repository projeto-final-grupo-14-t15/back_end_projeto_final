import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { updateUserRequestSchema, userSchemaRequest } from "../schemas/users.schemas";
import {
   createUserController,
   getUserByIdController,
   updateUserController,
} from "../controllers/users.controllers";
import { checkEmailAllReadyExistsMiddlewares } from "../middlewares/checkEmailAllreadyExists.middlewares";
import ensureTokenIsValidMiddlewares from "../middlewares/ensureTokenIsValid.middlewares";

const userRoutes: Router = Router();

userRoutes.post(
   "",

   checkEmailAllReadyExistsMiddlewares,
   createUserController
);
userRoutes.get("/:id", getUserByIdController);
userRoutes.patch('/:id', ensureTokenIsValidMiddlewares, ensureDataIsValidMiddleware(updateUserRequestSchema),updateUserController)

export default userRoutes;
