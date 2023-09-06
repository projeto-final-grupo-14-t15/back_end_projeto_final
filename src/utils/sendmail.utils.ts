import { createTransport } from "nodemailer";
import Mailgen from "mailgen";
import { iEmailRequest } from "../interfaces/mail.interfaces";
import { AppError } from "../error/error";

export const sendEmail = async ({
   to,
   subject,
   text,
}: iEmailRequest): Promise<void> => {
   const transporter = createTransport({
      host: "smtp.gmail.com",
      auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS,
      },
   });

   await transporter
      .sendMail({
         from: process.env.SMTP_USER,
         to,
         subject,
         html: text,
      })
      .then(() => {
         console.log("Email send with success");
      })
      .catch((err) => {
         console.error(err);
         throw new AppError("Error sending email, try again later", 500);
      });
};

export const resetPasswordTemplate = (
   userEmail: string,
   userName: string,
   resetToken: string
) => {
   const mailGenerator = new Mailgen({
      theme: "default",
      product: {
         name: "Solicitação de alteração de senha",
         link: "https://road-rovers.vercel.app/",
      },
   });

   const email = {
      body: {
         greeting: "Olá",
         signature: "Obrigado",
         name: userName,
         intro: "Você recebeu este e-mail porque uma solicitação de redefinição de senha para sua conta na Motors Shop foi solicitada.",
         action: {
            instructions: "Clique no botão abaixo para redefinir sua senha:",
            button: {
               color: "#4529E6",
               text: "Redefinir sua senha",
               link: `https://road-rovers.vercel.app/recoverypassword/${resetToken}`,
            },
         },
         outro: "Se você não solicitou uma redefinição de senha, basta ignorar este e-mail.",
      },
   };

   const emailBody = mailGenerator.generate(email);

   const emailTemplete = {
      to: userEmail,
      subject: "Redefinir senha",
      text: emailBody,
   };

   return emailTemplete;
};
