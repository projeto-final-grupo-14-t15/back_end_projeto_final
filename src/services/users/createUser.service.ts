import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TUserRequest } from "../../interfaces/users.interfaces";
import { User } from "../../entities/users.entitie";

import { Address } from "../../entities/address.entitie";

const createUserService = async (userData: TUserRequest): Promise<User> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);

  const addressData = userData.address
  
  const address: Address = addressRepository.create(addressData);
  await addressRepository.save(address);
  userData.address = address;
  
  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  return user;
};

export { createUserService };
