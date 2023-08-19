import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TUserRequest } from "../../interfaces/users.interfaces";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error/error";

export const updateUserService = async (userId:number,userData:TUserRequest): Promise<User[]> => {

    const userRepository:Repository<User> = AppDataSource.getRepository(User);

    const user:User | null= await userRepository.findOneBy({id:userId});

    if(!user){
        throw new AppError('User not found',404)
    }

    await userRepository.save({id:userId, ...userData});

    const updatedUserInfo:User[] = await userRepository.find({where: {id:userId}});

    return updatedUserInfo;
}