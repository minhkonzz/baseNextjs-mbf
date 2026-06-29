import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

type ZodSchema = z.ZodTypeAny;
type InferredZodSchema<T extends ZodSchema> = z.infer<T>;
type UseZodFormProps<T extends ZodSchema> = Omit<
  UseFormProps<InferredZodSchema<T>>,
  "resolver"
> & {
  schema: T;
};

export default function useZodForm<T extends ZodSchema>({
  schema,
  ...formConfig
}: UseZodFormProps<T>): UseFormReturn<InferredZodSchema<T>> {
  const form = useForm<InferredZodSchema<T>>({
    ...formConfig,
    resolver: zodResolver(schema),
  });

  return form;
}