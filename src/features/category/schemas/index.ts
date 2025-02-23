import { z } from "zod";

export const createCategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, "Minimal 1 karakter")
    .max(100, "Maksimal 100 karakter")
    .toLowerCase(),
});

export const updateCategoryFormSchema = createCategoryFormSchema.partial();


