import { z } from "zod";

export const createProductFormSchema = z.object({
    name: z
      .string()
      .min(1, "Minimal 1 karakter")
      .max(100, "Maksimal 100 karakter")
      .toLowerCase(),
    price: z
      .string()
      .min(1, "Minimal 1 karakter")
      .max(100, "Maksimal 100 karakter"),
    image: z.string().optional(),
    description: z
      .string()
      .min(1, "Minimal 1 karakter")
      .max(100, "Maksimal 100 karakter")
      .toLowerCase().optional(),
    category_id: z.string().min(1).max(100),
  });
  
  export const updateProductFormSchema = createProductFormSchema.partial();
  