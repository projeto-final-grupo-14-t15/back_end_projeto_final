import { z } from "zod";

const addressSchema = z.object({
   cep: z.string().min(8).max(10),
   state: z.string().min(2).max(55),
   city: z.string().min(2).max(55),
   street: z.string().min(2).max(55),
   complement: z.string().min(2).max(55),
   number: z.string().min(1),
});

export { addressSchema };
