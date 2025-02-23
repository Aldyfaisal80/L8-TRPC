import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import type { UpdateCategoryFormSchema } from "../types";

type EditCategoryFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateCategoryFormSchema) => void;
};

export const EditCategoryFormInner = ({
  formId,
  onSubmit,
}: EditCategoryFormInnerProps) => {
  const form = useFormContext<UpdateCategoryFormSchema>();
  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Input placeholder="Input your category" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
