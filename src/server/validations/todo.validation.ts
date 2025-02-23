import { z } from "zod";

export const createTodoRequest = z.object({
  text: z.string().min(1).max(100).toLowerCase(),
});

export const updateTodoRequest = createTodoRequest.partial();

export const createCategoryRequest = z.object({
  name: z.string().min(1).max(100).toLowerCase(),
});

export const updateCategoryRequest = createCategoryRequest.partial();
