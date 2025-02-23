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
import { updateCategoryFormSchema } from "../schemas";
import type { UpdateCategoryFormSchema } from "../types";
import { api } from "@/trpc/client";
import { useEffect } from "react";
import { toast as sonner } from "sonner";
import { useToast } from "@/hooks/use-toast";
import { EditCategoryFormInner } from "./EditCategoryFormInner";
import { useRouter } from "next/navigation";
type EditCategoryFormProps = {
  categoryId: string;
};

export const EditCategoryForm = ({ categoryId }: EditCategoryFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<UpdateCategoryFormSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(updateCategoryFormSchema),
  });

  const { mutate: updateCategory, isPending: isUpdateCategoryPending } = api.category.update.useMutation({
    onSuccess: () => {
      sonner.success("Berhasil memperbarui Category");
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

  const { data: category } = api.category.getById.useQuery({ id: categoryId });

  const onSubmit = (values: UpdateCategoryFormSchema) =>
    updateCategory({ id: categoryId, request: values });

  useEffect(() => {
    if (category) {
      form.reset({ name: category.name });
    }
  }, [form, category]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Category</CardTitle>
        <CardDescription>Update Your Name</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <EditCategoryFormInner formId="update-category-form" onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <CardFooter className="place-content-end">
        <Button
          form="update-category-form"
          disabled={isUpdateCategoryPending}
          className="px-10"
          type="submit"
        >
          {!isUpdateCategoryPending ? (
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
    // <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    //   <DialogTrigger asChild>
    //     <Button variant={"outline"} size={"sm"}>
    //       <SquarePen />
    //     </Button>
    //   </DialogTrigger>
    //   <DialogContent className="max-w-2xl">
    //     <DialogHeader>
    //       <DialogTitle>Update Todo</DialogTitle>
    //       <DialogDescription>Plan Your Day</DialogDescription>
    //     </DialogHeader>
    //     <Form {...form}>
    //       <EditCategoryFormInner formId="update-category-form" onSubmit={onSubmit} />
    //     </Form>
    //     <DialogFooter className="mt-10 place-content-end">
    //       <Button
    //         form="update-category-form"
    //         disabled={isUpdateCategoryPending || !form.formState.isDirty}
    //       >
    //         {!isUpdateCategoryPending ? (
    //           "Update"
    //         ) : (
    //           <>
    //             <Loader2 className="animate-spin" />
    //             Updating...
    //           </>
    //         )}
    //       </Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
};
