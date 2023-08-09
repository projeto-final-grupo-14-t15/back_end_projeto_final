import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid";
import { userSchemaRequest } from "../schemas/users.schemas";
import { createUserController } from "../controllers/users.controllers";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  createUserController
);
export default userRoutes;
