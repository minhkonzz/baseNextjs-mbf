"use client";

import { useMemo } from "react";
import AuthCard from "@/features/auth/components/auth-card";
import useRegister from "@/features/auth/hooks/use-register";
import { Link } from "@/i18n/navigation";
import { MbfAlert, MbfButton, MbfInput, MbfSpinner } from "@/shared/components";
import { useTranslations } from "next-intl";
import { z } from "zod";

import useZodForm from "@/hooks/use-zod-form";
import { Form as FormProvider } from "@/shared/components/ui/form";

export default function RegisterForm() {
  const t = useTranslations("auth.register");
  const tError = useTranslations("auth.error");
  const tValidation = useTranslations("auth.validation");
  const tCommon = useTranslations("common");
  const { mutate: register, isPending, error } = useRegister();

  const registerSchema = useMemo(
    () =>
      z
        .object({
          username: z.string().min(3, tValidation("usernameMin")),
          email: z.string().email(tValidation("emailInvalid")),
          password: z.string().min(6, tValidation("passwordMin")),
          confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: tValidation("confirmPasswordMismatch"),
          path: ["confirmPassword"],
        }),
    [tValidation]
  );

  type RegisterValues = z.infer<typeof registerSchema>;

  const form = useZodForm({
    schema: registerSchema,
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, control } = form;

  const onRegister = ({ confirmPassword: _, ...values }: RegisterValues) => {
    register(values);
  };

  return (
    <AuthCard
      title={t("title")}
      description={t("description")}
      footer={
        <span className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          {t("hasAccount")}{" "}
          <Link
            href="/auth/login"
            className="font-medium text-green-600 hover:text-green-700 hover:underline dark:text-green-400 dark:hover:text-green-300"
          >
            {tCommon("login")}
          </Link>
        </span>
      }
    >
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onRegister)}
          className="flex flex-col gap-4"
          autoComplete="off"
        >
          {error ? (
            <MbfAlert
              variant="destructive"
              title={tError("title")}
              description={
                error instanceof Error
                  ? error.message
                  : tError("registerFailed")
              }
            />
          ) : null}

          <MbfInput
            autoFocus
            control={control}
            name="username"
            label={t("username")}
            placeholder={t("usernamePlaceholder")}
          />

          <MbfInput
            control={control}
            name="email"
            label={t("email")}
            placeholder={t("emailPlaceholder")}
          />

          <MbfInput
            control={control}
            name="password"
            type="password"
            label={t("password")}
            placeholder={t("passwordPlaceholder")}
          />

          <MbfInput
            control={control}
            name="confirmPassword"
            type="password"
            label={t("confirmPassword")}
            placeholder={t("confirmPasswordPlaceholder")}
          />

          <MbfButton
            type="submit"
            className="mt-2 w-full bg-green-600 text-white hover:bg-green-700"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <MbfSpinner className="text-white" />
                {t("submitting")}
              </>
            ) : (
              t("submit")
            )}
          </MbfButton>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
