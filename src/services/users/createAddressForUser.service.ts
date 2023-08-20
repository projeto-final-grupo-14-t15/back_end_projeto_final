import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/address.entitie";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error/error";
import { TUserWithAddress } from "../../interfaces/users.interfaces";

const createAddressService = async (userId: number, addressData: Partial<Address>): Promise<TUserWithAddress> => {

    console.log('chegando até aqui')

    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const address: Address = addressRepository.create(addressData);
    await addressRepository.save(address);

    const user: any = await userRepository.find({ where: { id: userId } });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    user[0].address = address;
    await userRepository.save(user);
        
    return user;
}

export { createAddressService };