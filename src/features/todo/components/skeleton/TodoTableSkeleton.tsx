import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { renderElements } from "@/utils";

export const TableCellSkeleton = ({ className }: { className?: string }) => {
  return <Skeleton className={cn("h-3 w-full", className)} />;
};

export const TodoTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <TableCellSkeleton />
          </TableHead>
          <TableHead>
            <TableCellSkeleton />
          </TableHead>
          <TableHead className="w-[50px]">
            <TableCellSkeleton />
          </TableHead>
          <TableHead className="w-[150px]">
            <TableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TodoTableBodySkeleton />
    </Table>
  );
};

export const TodoTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, i) => i,
        render: () => <TodoTableItemSkeleton />,
      })}
    </TableBody>
  );
};

export const TodoTableItemSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <TableCellSkeleton />
      </TableCell>
      <TableCell>
        <TableCellSkeleton />
      </TableCell>
      <TableCell>
        <TableCellSkeleton />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Skeleton className="h-8 w-[40px]" />
        <Skeleton className="h-8 w-[40px]" />
      </TableCell>
    </TableRow>
  );
};
