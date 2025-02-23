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
import type { CreateCategoryFormSchema } from "../types";
import { createCategoryFormSchema } from '../schemas/index';
import { CreateCategoryFormInner } from "./CreateCategoryFormInner";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


export const CreateCategoryForm = () => {
  const { toast } = useToast()
  const router = useRouter();
  const form = useForm<CreateCategoryFormSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createCategoryFormSchema),
  });

  const { mutate: createCategory, isPending: isCreateCategoryPending } = api.category.create.useMutation({
    onSuccess: () => {
      sonner.success("Berhasil membuat Category");
      form.reset();
      router.push(`/category`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
  })

  const onSubmit = (values: CreateCategoryFormSchema) => createCategory(values);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category</CardTitle>
        <CardDescription>Create your category</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <CreateCategoryFormInner formId="create-category-form" onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <CardFooter className="place-content-end">
        <Button
          form="create-category-form"
          disabled={isCreateCategoryPending}
          className="px-10"
          type="submit"
        >
          {!isCreateCategoryPending ? (
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
