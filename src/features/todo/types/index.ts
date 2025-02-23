import type { z } from "zod";
import type { createTodoFormSchema, updateTodoFormSchema } from "../schemas";


export type CreateTodoFormSchema = z.infer<typeof createTodoFormSchema>;
export type UpdateTodoFormSchema = z.infer<typeof updateTodoFormSchema>;
