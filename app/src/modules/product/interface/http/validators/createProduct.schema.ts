import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),

  price: z.number({
    message: "Price must be a number"
  }),

  quantity: z
    .number({ message: "Quantity must be a number" })
    .positive({ message: "Quantity must be greater than zero" })
});