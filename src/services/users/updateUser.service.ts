import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TUpdateUserRequest } from "../../interfaces/users.interfaces";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error/error";

export const updateUserService = async (userId:number,userData:TUpdateUserRequest): Promise<User[]> => {

    const userRepository:Repository<User> = AppDataSource.getRepository(User);

    const user:User | null= await userRepository.findOneBy({id:userId});

    if(!user){
        throw new AppError('User not found',404)
    }

    const updatedData: Partial<User> = {};
    const updatableFields: (keyof TUpdateUserRequest)[] = [
        "name",
        "email",
        "description",
        "telephone",
        "cpf",
        "dateOfBirth",
    ];

    updatableFields.forEach((field) => {
        const value = userData[field];

        if (value !== undefined && value.trim() !== "") {
            updatedData[field] = value.trim();
        }
    });

    if (Object.keys(updatedData).length === 0) {
        return [user];
    }

    await userRepository.update(userId, updatedData);

    const updatedUserInfo: User[] = await userRepository.find({ where: { id: userId } });

    return updatedUserInfo;
}