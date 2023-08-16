import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { userSchemaRequest } from "../schemas/users.schemas";
import { createUserController } from "../controllers/users.controllers";
import { checkEmailAllReadyExistsMiddlewares } from "../middlewares/checkEmailAllreadyExists.middlewares";

const userRoutes: Router = Router();

userRoutes.post(
   "",
   ensureDataIsValidMiddleware(userSchemaRequest),
   checkEmailAllReadyExistsMiddlewares,
   createUserController
);
export default userRoutes;
