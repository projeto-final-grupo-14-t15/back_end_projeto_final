import jwt from "jsonwebtoken";
import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";
import { compare } from "bcryptjs";
import TLoginRequest from "../../interfaces/login.interfaces";
import "dotenv/config";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error/error";

const logIn = async (data: TLoginRequest): Promise<string> => {
   const userRepository: Repository<User> = AppDataSource.getRepository(User);

   const client: User | null = await userRepository.findOne({
      where: {
         email: data.email,
      },
   });

   if (!client) {
      throw new AppError("Invalid credentials", 401);
   }

   const passwordMatch = await compare(data.password, client.password);

   if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
   }

   const token = jwt.sign(
      { admin: client.isAdmin, id: client.id },
      String(process.env.SECRET_KEY),
      {
         expiresIn: "24h",
         subject: String(client.id),
      }
   );

   return token;
};

export default logIn;
