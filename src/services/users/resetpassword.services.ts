import { hashSync } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entitie";
import { Repository } from "typeorm";
import { AppError } from "../../error/error";

const resetPasswordService = async (password: string, resetToken: string) => {
   const userRepository: Repository<User> = AppDataSource.getRepository(User);

   const user = await userRepository.findOneBy({
      reset_password: resetToken,
   });

   if (!user) {
      throw new AppError("user not found", 404);
   }

   const oldUserData = await userRepository.findOneBy({
      id: user.id,
   });

   const updatedUser = userRepository.create({
      ...oldUserData,
      ...{
         password: hashSync(password, 10),
         reset_password: null,
      },
   });

   await userRepository.save(updatedUser);
};

export default resetPasswordService;
