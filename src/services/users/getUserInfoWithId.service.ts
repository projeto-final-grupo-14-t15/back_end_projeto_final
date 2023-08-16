import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entitie";
import { userInfoSchema } from "../../schemas/users.schemas";
import { TUserInfo } from "../../interfaces/users.interfaces";
import { AppError } from "../../error/error";

export const getUserInfo = async (userId:number): Promise<TUserInfo> => {

    const userRepository:Repository<User> = AppDataSource.getRepository(User);

    const user:User | null= await userRepository.findOneBy({id:userId});

    if(!user){
        throw new AppError('User not found',404)
    }

    return userInfoSchema.parse(user);
}