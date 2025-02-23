import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderElements } from "@/utils";
import type { Todo } from "@prisma/client";
import { DeleteTodoDialog } from "../components/action/DeleteTodoDialog";
import { EditTodoForm } from "../forms";
import { TodoTableBodySkeleton } from "../components/skeleton";

type TodoTableProps = {
  todos?: Todo[];
  isTodosLoading: boolean;
  refetchTodos: () => void;
};

export const TodoTable = ({
  todos,
  isTodosLoading,
  refetchTodos,
}: TodoTableProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Text</TableHead>
          <TableHead className="w-[50px]">Status</TableHead>
          <TableHead className="w-[150px]">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      {isTodosLoading && <TodoTableBodySkeleton />}
      <TableBody>
        {renderElements({
          of: todos,
          keyExtractor: (todo) => todo.id,
          render: (todo, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{todo.text}</TableCell>
              <TableCell>{todo.status ? "Selesai" : "Pending"}</TableCell>
              <TableCell className="flex items-center gap-2">
                <EditTodoForm todoId={todo.id} refetchTodos={refetchTodos} />
                <DeleteTodoDialog
                  todoId={todo.id}
                  refetchTodos={refetchTodos}
                />
              </TableCell>
            </TableRow>
          ),
          isLoading: isTodosLoading,
          fallback: (
            <TableRow>
              <TableCell colSpan={4}>Tidak ada data todo</TableCell>
            </TableRow>
          ),
        })}
      </TableBody>
    </Table>
  );
};
