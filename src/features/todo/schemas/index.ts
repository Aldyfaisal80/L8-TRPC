import { z } from "zod";

export const createProductFormSchema = z.object({
  name: z.string().min(3, "Minimal 3 karakter").max(100, "Maksimal 100 karakter").toLowerCase(),
  price: z.string().min(3,"Minimal Harga 3 karakter").max(100,"Maksimal Harga 100 karakter"),
  image: z.optional(z.string()),
  description: z.string().min(3, "Minimal 3 karakter").max(100, "Maksimal 100 karakter").toLowerCase(),
})



export const createTodoFormSchema = z.object({
  text: z
    .string()
    .min(1, "Minimal 1 karakter")
    .max(100, "Maksimal 100 karakter")
    .toLowerCase(),
});

export const updateTodoFormSchema = createTodoFormSchema.partial();
