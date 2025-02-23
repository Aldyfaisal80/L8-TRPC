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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/client";
import { useEffect } from "react";
import { toast as sonner } from "sonner";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { EditProductFormInner } from "./EditProductFormInner";
import { type UpdateProductFormSchema } from "../types";
import { updateProductFormSchema } from "../schemas";
type EditProductFormProps = {
  productId: string;
};

export const EditProductForm = ({ productId }: EditProductFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<UpdateProductFormSchema>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category_id: "",
      image: "",
    },
    resolver: zodResolver(updateProductFormSchema),
  });

  const { mutate: updateProduct, isPending: isUpdateProductPending } = api.product.update.useMutation({
    onSuccess: () => {
      sonner.success("Berhasil memperbarui product");
      router.push(`/product`);

    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
  })

  const { data: product } = api.product.getById.useQuery({ id: productId });


  const onSubmit = (values: UpdateProductFormSchema) => {
    updateProduct({ id: productId, request: values });
  }

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        price: product.price,
        category_id: product.category_id,
        description: product.description ?? "",
        image: product.image ?? "",
      });
    }
  }, [form, product]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo</CardTitle>
        <CardDescription>Plan your day</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <EditProductFormInner formId="update-product-form" onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <CardFooter className="place-content-end">
        <Button
          form="update-product-form"
          disabled={isUpdateProductPending}
          className="px-10"
          type="submit"
        >
          {!isUpdateProductPending ? (
            "Add"
          ) : (
            <>
              <Loader2 className="animate-spin" />
              Adding...
            </>
          )}
        </Button>
      </CardFooter>
    </Card >
  );
};
