import { Request, Response } from "express";
import TLoginRequest from "../interfaces/login.interfaces";
import logIn from "../services/login/login.services";

const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: TLoginRequest = req.body;

  const token = await logIn(loginData);

  return res.json({ token });
};

export { loginController };
