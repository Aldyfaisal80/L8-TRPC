import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
    createCategoryRequest,
    updateCategoryRequest,
} from "@/server/validations/todo.validation";

export const categoryRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
            const { db } = ctx;
            const category = await db.category.findMany({
                select: {
                    id: true,
                    name: true,
                    created_at: true,
                    updated_at: true,
                },
            });
            return category;
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

                const category = await db.category.findUnique({
                    where: { id } ,
                    select: {
                        id: true,
                        name: true,
                    },
                });

                if (!category) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: `Category with ID : ${id} not found`,
                    });
                }

                return category;
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
        .input(createCategoryRequest)
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx;
                const { name } = input;
                const existingCategory = await db.category.findUnique({
                    where: { name },
                });
    
                if (existingCategory) {
                    throw new TRPCError({
                        code: "CONFLICT",
                        message: `Category with name: ${name} already exists`,
                    });
                }
                await db.category.create({
                    data: {
                        ...input,
                        name,
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
                request: updateCategoryRequest,
            }),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx;
                const { id, request } = input;
                const { name } = request;
                const categoryExists = await db.category.count({ where: { id } });
                const categoryNameExists = await db.category.findUnique({
                    where: { name }
                })

                if (categoryNameExists?.name === name){
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: `Category with name : ${name} has already exists`,
                    })
                }

                if (categoryExists === 0) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: `Category with ID : ${id} not found`,
                    });
                }

                await db.category.update({
                    where: { id }, data: { ...request, name },
                    select: {
                        id: true,
                        name: true,
                        created_at: true,
                        updated_at: true
                    }
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

    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx;
                const { id } = input;
                const categoryExists = await db.category.count({ where: { id } });

                if (categoryExists === 0) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: `Category with ID : ${id} not found`,
                    });
                }

                await db.category.delete(
                    {
                        where: { id },
                        select: {
                            id: true
                        }
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
});
