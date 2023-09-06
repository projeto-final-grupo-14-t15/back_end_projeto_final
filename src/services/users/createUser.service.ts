import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TUserRequest } from "../../interfaces/users.interfaces";
import { User } from "../../entities/users.entitie";

const createUserService = async (userData: TUserRequest): Promise<User> => {
   const userRepository: Repository<User> = AppDataSource.getRepository(User);

   const user: User = userRepository.create(userData);

   await userRepository.save(user);

   return user;
};
export { createUserService };
