import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, renderElements } from "@/utils";
import type { Category } from "@prisma/client";
import { CategoryTableBodySkeleton } from "../components/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { DeleteCategoryDialog } from "../components/action/DeleteCategoryDialog";

type TodoCategoryProps = {
  categories?: Category[];
  isCategoriesLoading: boolean;
  refetchCategories: () => void;
};

export const CategoryTable = ({
  categories,
  isCategoriesLoading,
  refetchCategories,
}: TodoCategoryProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent Categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-[150px]">Create At</TableHead>
          <TableHead className="w-[150px]">Update At</TableHead>
          <TableHead className="w-[150px] text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      {isCategoriesLoading && <CategoryTableBodySkeleton />}
      <TableBody>
        {renderElements({
          of: categories,
          keyExtractor: (category) => category.id,
          render: (category, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{formatDate(category.created_at, "medium")}</TableCell>
              <TableCell>{formatDate(category.updated_at, "medium")}</TableCell>
              <TableCell className="flex justify-center items-center gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/category/${category.id}/edit`}><NotebookPen /></Link>
                </Button>
                <DeleteCategoryDialog
                  categoryId={category.id}
                  refetchCategories={refetchCategories}
                />
              </TableCell>
            </TableRow>
          ),
          isLoading: isCategoriesLoading,
          fallback: (
            <TableRow>
              <TableCell colSpan={4}>Tidak ada data Category</TableCell>
            </TableRow>
          ),
        })}
      </TableBody>
    </Table>
  );
};
