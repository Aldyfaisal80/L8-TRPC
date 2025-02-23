import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  createTodoRequest,
  updateTodoRequest,
} from "@/server/validations/todo.validation";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const { db } = ctx;
      const todos = await db.todo.findMany();
      return todos;
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get all todo",
        cause: error,
      });
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const { db } = ctx;
        const { id } = input;
        const todo = await db.todo.findUnique({ where: { id } });

        if (!todo) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Todo with ID : ${id} not found`,
          });
        }

        return todo;
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get todo",
          cause: error,
        });
      }
    }),

  create: publicProcedure
    .input(createTodoRequest)
    .mutation(async ({ ctx, input }) => {
      try {
        const { db } = ctx;
        const { text } = input;
        await db.todo.create({
          data: {
            ...input,
            text,
          },
        });
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create todo",
          cause: error,
        });
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        request: updateTodoRequest,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { db } = ctx;
        const { id, request } = input;
        const { text } = request;

        const todoExists = await db.todo.count({ where: { id } });

        if (todoExists === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Todo with ID : ${id} not found`,
          });
        }

        await db.todo.update({ where: { id }, data: { ...request, text } });
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update todo",
          cause: error,
        });
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { db } = ctx;
        const { id } = input;
        const todoExists = await db.todo.count({ where: { id } });

        if (todoExists === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Todo with ID : ${id} not found`,
          });
        }

        await db.todo.delete({ where: { id } });
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete todo",
          cause: error,
        });
      }
    }),
});
