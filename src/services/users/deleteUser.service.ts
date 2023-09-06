import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error/error";

const deleteUserService = async (userId:number) : Promise<void> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepo.findOneBy({id: userId});

    if(user?.deletedAt !== null){
        throw new AppError('User not found', 404);
    };

    await userRepo.softRemove(user!);
};

export default deleteUserService;