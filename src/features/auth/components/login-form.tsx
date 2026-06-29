"use client";

import { useMemo } from "react";
import { MOCK_ACCOUNTS } from "@/constants/auth";
import AuthCard from "@/features/auth/components/auth-card";
import useLogin from "@/features/auth/hooks/use-login";
import { Link } from "@/i18n/navigation";
import { MbfAlert, MbfButton, MbfInput, MbfSpinner } from "@/shared/components";
import { useTranslations } from "next-intl";
import { z } from "zod";

import useZodForm from "@/hooks/use-zod-form";
import { Form as FormProvider } from "@/shared/components/ui/form";

export default function LoginForm() {
  const t = useTranslations("auth.login");
  const tError = useTranslations("auth.error");
  const tValidation = useTranslations("auth.validation");
  const tCommon = useTranslations("common");
  const { login, isPending, error } = useLogin();

  const loginSchema = useMemo(
    () =>
      z.object({
        usernameOrEmail: z
          .string()
          .min(1, tValidation("usernameOrEmailRequired")),
        password: z.string().min(1, tValidation("passwordRequired")),
      }),
    [tValidation]
  );

  const form = useZodForm({
    schema: loginSchema,
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  return (
    <AuthCard
      title={t("title")}
      description={t("description")}
      footer={
        <div className="flex w-full flex-col items-center gap-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/forgot-password"
            className="font-medium text-green-600 hover:text-green-700 hover:underline dark:text-green-400 dark:hover:text-green-300"
          >
            {t("forgotPassword")}
          </Link>
          <span>
            {t("noAccount")}{" "}
            <Link
              href="/auth/register"
              className="font-medium text-green-600 hover:text-green-700 hover:underline dark:text-green-400 dark:hover:text-green-300"
            >
              {tCommon("register")}
            </Link>
          </span>
        </div>
      }
    >
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(login)}
          className="flex flex-col gap-4"
          autoComplete="off"
        >
          {error ? (
            <MbfAlert
              title={tError("title")}
              description={
                error instanceof Error ? error.message : tError("loginFailed")
              }
            />
          ) : null}

          <MbfInput
            autoFocus
            control={control}
            name="usernameOrEmail"
            label={t("usernameOrEmail")}
            placeholder={t("usernameOrEmailPlaceholder")}
          />

          <MbfInput
            control={control}
            type="password"
            name="password"
            label={t("password")}
            placeholder={t("passwordPlaceholder")}
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

          <p className="rounded-lg border border-green-100 bg-green-50 p-3 text-center text-xs text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-200">
            {t("mockHint", {
              username: MOCK_ACCOUNTS.ADMIN.username,
              password: MOCK_ACCOUNTS.ADMIN.password,
            })}
          </p>
        </form>
      </FormProvider>
    </AuthCard>
  );
}
