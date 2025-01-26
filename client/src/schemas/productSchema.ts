import { z } from "zod";

export const productSchema = z.object({
codigo: z.string(),
  descripcion: z.string(),
  precio: z.number(),
  imagen: z.string().optional(), // Optional because it's nullable
  ubicacion: z.string().optional(), // Optional because it's nullable
});

export type Product = z.infer<typeof productSchema>;