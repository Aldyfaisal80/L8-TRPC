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
// import type { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { ProductTableBodySkeleton } from "../components/skeleton";
import { DeleteProductDialog } from "../components/action/DeleteProductDialog";
import type { Product } from "../types";

type TodoProductProps = {
  products?: Product[];
  isProductsLoading: boolean;
  refetchProducts: () => void;
};

export const ProductTable = ({
  products,
  isProductsLoading,
  refetchProducts,
}: TodoProductProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent Categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-[150px] text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      {isProductsLoading && <ProductTableBodySkeleton />}
      <TableBody>
        {renderElements({
          of: products,
          keyExtractor: (product) => product.id,
          render: (product, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell className="flex justify-center items-center gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/product/${product.id}/edit`}><NotebookPen /></Link>
                </Button>
                <DeleteProductDialog
                  productId={product.id}
                  refetchProducts={refetchProducts}
                />
              </TableCell>
            </TableRow>
          ),
          isLoading: isProductsLoading,
          fallback: (
            <TableRow>
              <TableCell colSpan={4}>Tidak ada data product</TableCell>
            </TableRow>
          ),
        })}
      </TableBody>
    </Table>
  );
};
