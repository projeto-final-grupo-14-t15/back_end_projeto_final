import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/address.entitie";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error/error";

export const updateAddressService = async (
   userId: number,
   addressData: Partial<Address>
): Promise<Address> => {
   const userRepository: Repository<User> = AppDataSource.getRepository(User);

   const addressRepository: Repository<Address> =
      AppDataSource.getRepository(Address);

   const user = await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.address", "address")
      .where("user.id = :userId", { userId })
      .getOne();

   if (!user) {
      throw new AppError("User not found", 404);
   }

   if (!user.address) {
      throw new AppError("User does not have an address", 400);
   }

   const updatedAddress = { ...user.address, ...addressData };

   await addressRepository.save(updatedAddress);

   return updatedAddress;
};
