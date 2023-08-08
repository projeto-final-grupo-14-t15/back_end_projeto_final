import { Router } from "express";
import { loginController } from "../controllers/login.controller";
loginController;

const loginRoutes: Router = Router();
loginRoutes.post("", loginController);
export default loginRoutes;
