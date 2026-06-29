import {
  forwardRef,
  type ComponentProps,
  type HTMLInputTypeAttribute,
} from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

type CustomInputProps = {
  label?: string;
  type?: HTMLInputTypeAttribute | "textarea";
  isFormInput?: boolean;
};

type FormInputProps<T extends FieldValues> = CustomInputProps & {
  control: Control<T>;
  name: string;
};

type BaseInputProps =
  | (ComponentProps<"input"> & Omit<CustomInputProps, "isFormInput">)
  | ({ type?: "textarea" } & ComponentProps<"textarea"> &
      Pick<CustomInputProps, "label">);

function BaseInput({
  label,
  type = "text",
  ...baseInputProps
}: BaseInputProps) {
  return (
    <div className="space-y-2">
      {!!label && <label>{label}</label>}
      {type === "textarea" ? (
        <Textarea {...(baseInputProps as ComponentProps<"textarea">)} />
      ) : (
        <Input type={type} {...(baseInputProps as ComponentProps<"input">)} />
      )}
    </div>
  );
}

type FormInputWrapperProps<T extends FieldValues> =
  | (ComponentProps<"input"> & Omit<FormInputProps<T>, "isFormInput">)
  | ({ type?: "textarea" } & ComponentProps<"textarea"> &
      Omit<FormInputProps<T>, "isFormInput" | "type">);

function FormInputWrapper<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  ...formInputWrapperProps
}: FormInputWrapperProps<T>) {
  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem>
          {!!label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                {...(formInputWrapperProps as ComponentProps<"textarea">)}
                {...field}
              />
            ) : (
              <Input
                type={type}
                {...(formInputWrapperProps as ComponentProps<"input">)}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type MbfInputProps<T extends FieldValues> =
  | ({ isFormInput?: false } & ComponentProps<"input"> & CustomInputProps)
  | ({ isFormInput?: false; type?: "textarea" } & ComponentProps<"textarea"> &
      CustomInputProps)
  | ({ isFormInput?: true } & ComponentProps<"input"> & FormInputProps<T>)
  | ({ isFormInput?: true; type?: "textarea" } & ComponentProps<"textarea"> &
      FormInputProps<T>);

export default function MbfInput<T extends FieldValues>({
  isFormInput = true,
  ...inputProps
}: MbfInputProps<T>) {
  return (
    (isFormInput && (
      <FormInputWrapper {...(inputProps as FormInputProps<T>)} />
    )) || <BaseInput {...inputProps} />
  );
}
