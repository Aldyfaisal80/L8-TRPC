"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";
import { EditTodoFormInner } from "./EditTodoFormInner";
import { api } from "@/trpc/client";
import { useEffect, useState } from "react";
import { toast as sonner } from "sonner";
import { useToast } from "@/hooks/use-toast";
import { type UpdateTodoFormSchema } from "../types";
import { updateTodoFormSchema } from "../schemas";

type EditTodoFormProps = {
  todoId: string;
  refetchTodos: () => void;
};

export const EditTodoForm = ({ todoId, refetchTodos }: EditTodoFormProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const form = useForm<UpdateTodoFormSchema>({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(updateTodoFormSchema),
  });

  const { mutate: updateTodo, isPending: isUpdateTodoPending } =
    api.todo.update.useMutation({
      onSuccess: () => {
        sonner.success("Berhasil memperbarui todo");
        refetchTodos();
        setIsDialogOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Error",
          variant: "destructive",
          description: error.message,
        });
      },
    });

  const { data: todo } = api.todo.getById.useQuery({ id: todoId });

  const onSubmit = (values: UpdateTodoFormSchema) =>
    updateTodo({ id: todoId, request: values });

  useEffect(() => {
    if (todo) {
      form.reset({ text: todo.text });
    }
  }, [form, todo]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
          <DialogDescription>Plan Your Day</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <EditTodoFormInner formId="update-todo-form" onSubmit={onSubmit} />
        </Form>
        <DialogFooter className="mt-10 place-content-end">
          <Button
            form="update-todo-form"
            disabled={isUpdateTodoPending || !form.formState.isDirty}
          >
            {!isUpdateTodoPending ? (
              "Update"
            ) : (
              <>
                <Loader2 className="animate-spin" />
                Updating...
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
