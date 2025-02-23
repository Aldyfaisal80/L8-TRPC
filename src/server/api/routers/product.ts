import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
    createProductRequest,
    updateProductRequest,
} from "@/server/validations/product.validation";

export const productRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
            const { db } = ctx;
            const products = await db.product.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    image: true,
                    created_at: true,
                    updated_at: true,
                    category_id: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    }
                },
            });
            return products;
        } catch (error) {
            if (error instanceof TRPCError) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: error.message,
                    cause: error,
                });
            }
        }
    }),

    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                const { db } = ctx;
                const { id } = input;
                const product = await db.product.findUnique({
                    where: { id },
                    include: {
                        category: true,
                    },
                });
                return product;
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: error.message,
                        cause: error,
                    });
                }
            }
        }),

    create: publicProcedure
        .input(createProductRequest)
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx;
                const { name, description, price, image, category_id } = input;
                await db.product.create({
                    data: {
                        ...input,
                        name,
                        description,
                        price,
                        image,
                        category_id,
                    },
                });
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: error.message,
                        cause: error,
                    });
                }
            }
        }),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                request: updateProductRequest,
            }),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx;
                const { id, request } = input;
                const { name, description, price, image, category_id } = request
                const productExists = await db.product.count({ where: { id } });

                if (productExists === 0) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: `Product with ID : ${id} not found`,
                    });
                }

                await db.product.update({ where: { id }, data: { ...request, name, description, price, image, category_id } });
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: error.message,
                        cause: error,
                    });
                }
            }
        }),

    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx;
                const { id } = input;
                const productExists = await db.product.count({ where: { id } });

                if (productExists === 0) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: `Product with ID : ${id} not found`,
                    });
                }

                await db.product.delete({ where: { id } });
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: error.message,
                        cause: error,
                    });
                }
            }
        }),
});
