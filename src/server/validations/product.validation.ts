import { z } from "zod";

export const createProductRequest = z.object({
    name: z.string().min(1).max(100).toLowerCase(),
    price: z.string().min(1).max(100),
    image: z.string().optional(),
    description: z.string().min(1).max(100).toLowerCase().optional(),
    category_id: z.string().min(1).max(100),
})

export const updateProductRequest = createProductRequest.partial();