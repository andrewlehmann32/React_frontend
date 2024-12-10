// Imports:
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { authKeys, authSchema, TAuthSchema } from "../../schemas/auth-schema";
import { TGenericProps } from "../../types/generics.types";

export function AuthFormProvider({ children }: TGenericProps) {
  const form = useForm<TAuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      [authKeys.EMAIL]: "",
      [authKeys.PASSWORD]: "",
    },
    mode: "onChange",
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}

export function useAuthContext() {
  const formHook = useFormContext<TAuthSchema>();
  return useMemo(() => ({ formHook }), [formHook]);
}
