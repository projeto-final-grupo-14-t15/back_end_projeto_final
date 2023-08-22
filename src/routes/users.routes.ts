import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { updatedUserRequestSchema } from "../schemas/users.schemas";
import {
   createAddressController,
   createUserController,
   deleteUserController,
   getUserByIdController,
   resetPasswordController,
   sendResetEmailPasswordControler,
   updateAddressController,
   updateUserController,
} from "../controllers/users.controllers";
import { checkEmailAllReadyExistsMiddlewares } from "../middlewares/checkEmailAllreadyExists.middlewares";
import ensureTokenIsValidMiddlewares from "../middlewares/ensureTokenIsValid.middlewares";
import { ensureUserIsAllowed } from "../middlewares/ensureUserIsAllowed copy";
import checkUserExists from "../middlewares/checkUserExists.middleware";
import checkAccountPermision from "../middlewares/checkAccountPermission.middleware";

const userRoutes: Router = Router();

userRoutes.post(
   "",

   checkEmailAllReadyExistsMiddlewares,
   createUserController
);
userRoutes.get(
   "/:id",
   getUserByIdController
);
userRoutes.patch(
   "/:id",
   ensureTokenIsValidMiddlewares,
   ensureUserIsAllowed ,
   ensureDataIsValidMiddleware(updatedUserRequestSchema),
   updateUserController
);
userRoutes.delete(
   "/:id",
   checkUserExists,
   ensureTokenIsValidMiddlewares,
   checkAccountPermision,
   deleteUserController
);
userRoutes.post("/resetPassword", sendResetEmailPasswordControler)
userRoutes.patch("/resetPassword/:token", resetPasswordController)
userRoutes.post('/:id/address', ensureTokenIsValidMiddlewares, ensureUserIsAllowed ,createAddressController);
userRoutes.patch('/:id/address', ensureTokenIsValidMiddlewares, ensureUserIsAllowed ,updateAddressController);

export default userRoutes;
