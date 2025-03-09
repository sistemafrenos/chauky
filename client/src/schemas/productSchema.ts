import { z } from "zod";

export const productSchema = z.object({
  id: z.number().optional(), // Optional because it's nullable
  codigo: z.string().min(2),
  descripcion: z.string(),
  precio: z.coerce.number().optional(),
  ubicacion: z.string().optional(), // Optional because it's nullable
});

export type Product = z.infer<typeof productSchema>;