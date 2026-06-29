import type { VariantProps } from "class-variance-authority";

import { Alert, AlertDescription, AlertTitle, alertVariants } from "./related";

interface MbfAlertProps {
  title: string;
  description: string;
  variant?: VariantProps<typeof alertVariants>["variant"];
}

export default function MbfAlert({
  title,
  description,
  variant = "default",
}: MbfAlertProps) {
  return (
    <Alert variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
