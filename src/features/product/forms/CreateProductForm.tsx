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
import { useRouter } from "next/navigation";
import { CreateProductFormInner } from "./CreateProductFormInner";
import { type CreateProductFormSchema } from "../types";
import { createProductFormSchema } from "../schemas";


export const CreateProductForm = () => {
  const router = useRouter();
  const form = useForm<CreateProductFormSchema>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: "",
      category_id: "",
    },
    resolver: zodResolver(createProductFormSchema),
  });

  const { mutate: createProduct, isPending: isCreateProductPending } = api.product.create.useMutation({
    onSuccess: () => {
      sonner.success("Berhasil membuat Product");
      form.reset();
      router.push(`/product`);
    },
    onError: (error) => {
      sonner.error(`Error: ${error.message}`);
    }
  })


  const onSubmit = (values: CreateProductFormSchema) => createProduct(values);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product</CardTitle>
        <CardDescription>Create Product</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <CreateProductFormInner formId="create-product-form" onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <CardFooter className="place-content-end">
        <Button
          form="create-product-form"
          disabled={isCreateProductPending}
          className="px-10"
          type="submit"
        >
          {!isCreateProductPending ? (
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
