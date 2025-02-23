import { type z } from "zod";
import type { createProductFormSchema, updateProductFormSchema } from "../schemas";

export type Product = {
    id: string;
    name: string;
    price: string;
    image: string | null;
    description: string | null;
    category_id: string;
    created_at: Date;
    updated_at: Date;
    category: {
        id: string;
        name: string;
    };
}

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>;
export type UpdateProductFormSchema = z.infer<typeof updateProductFormSchema>;