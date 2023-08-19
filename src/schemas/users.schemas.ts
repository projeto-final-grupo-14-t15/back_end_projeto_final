import { z } from "zod";
import { announcementsSchemaResponse } from "./announcements.schemas";
import { addressSchema } from "./address.schema";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().max(155),
  password: z.string().max(255),
  isAdmin: z.boolean(),
  description: z.string().max(255),
  telephone: z.string().max(25),
  cpf: z.string().max(15),
  dateOfBirth: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  announcements: announcementsSchemaResponse
});

const userSchemaRequest = userSchema.omit({
  id: true,
  createdAt: true,
  announcements: true,
  updatedAt: true,
});

const userSchemaWithAddress = userSchema.extend({
  address: addressSchema
});

const updatedUserRequestSchema = userSchemaRequest.partial();

const userSchemaRequestDois = userSchema.omit({
  updatedAt: true,
  createdAt: true,
  password: true,
  announcements: true,
});

const userSchemaResponse = userSchema.omit({
  password: true,
});

const userInfoSchema = userSchema.omit({
  updatedAt: true,
  createdAt: true,
  password: true,
  announcements: true,
  cpf:true,
  dateOfBirth:true,
  address:true
});

export {
  userSchema,
  userSchemaResponse,
  userSchemaRequest,
  userSchemaRequestDois,
  userInfoSchema,
  updatedUserRequestSchema,
  userSchemaWithAddress
};
