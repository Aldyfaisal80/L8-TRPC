"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast as sonner } from "sonner";
import { CreateTodoFormInner } from "./CreateTodoFormInner";
import { type CreateTodoFormSchema } from "../types";
import { createTodoFormSchema } from "../schemas";

type CreateTodoFormProps = {
  refetchTodos: () => void;
};

export const CreateTodoForm = ({ refetchTodos }: CreateTodoFormProps) => {
  const form = useForm<CreateTodoFormSchema>({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(createTodoFormSchema),
  });

  const { mutate: createTodo, isPending: isCreateTodoPending } =
    api.todo.create.useMutation({
      onSuccess: () => {
        sonner.success("Berhasil membuat todo");
        refetchTodos();
        form.reset();
      },
    });

  const onSubmit = (values: CreateTodoFormSchema) => createTodo(values);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo</CardTitle>
        <CardDescription>Plan your day</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <CreateTodoFormInner formId="create-todo-form" onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <CardFooter className="place-content-end">
        <Button
          form="create-todo-form"
          disabled={isCreateTodoPending}
          className="px-10"
        >
          {!isCreateTodoPending ? (
            "Add"
          ) : (
            <>
              <Loader2 className="animate-spin" />
              Adding...
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
