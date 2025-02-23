"use client";
import { PageContainer, SectionContainer } from "@/components/layouts";
import { CreateTodoForm } from "../forms";
import { TodoTable } from "../tables";
import { api } from "@/trpc/client";

export const TodoPage = () => {
  const {
    data: todos,
    isLoading: isTodosLoading,
    refetch: refetchTodos,
  } = api.todo.getAll.useQuery();

  return (
    <PageContainer withHeader withFooter>
      <SectionContainer padded container className="mt-10 min-h-screen gap-20">
        <section>
          <CreateTodoForm refetchTodos={refetchTodos} />
        </section>
        <section>
          <TodoTable
            todos={todos}
            isTodosLoading={isTodosLoading}
            refetchTodos={refetchTodos}
          />
        </section>
      </SectionContainer>
    </PageContainer>
  );
};
