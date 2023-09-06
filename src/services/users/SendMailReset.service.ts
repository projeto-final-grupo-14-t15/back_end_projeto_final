import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entitie";
import { AppError } from "../../error/error";
import { randomUUID } from "crypto";
import { resetPasswordTemplate, sendEmail } from "../../utils/sendmail.utils";

export const sendResetEmailPassword = async (email: string) => {
   const userRepository: Repository<User> = AppDataSource.getRepository(User);

   const user = await userRepository.findOneBy({ email: email });

   if (!user) {
      throw new AppError("User not found", 404);
   }

   const resetToken = randomUUID();

   const newUser = userRepository.create({
      ...user,
      ...{ reset_password: resetToken },
   });

   await userRepository.save(newUser);

   const resetPassword = resetPasswordTemplate(
      user.email,
      user.name,
      resetToken
   );

   await sendEmail(resetPassword);
};
