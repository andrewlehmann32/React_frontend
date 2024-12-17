// Imports:
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  authKeys,
  loginSchema,
  registerSchema,
  TLoginSchema,
  TRegisterSchema,
} from "../../schemas/auth-schema";
import { TGenericProps } from "../../types/generics.types";

// Register Form Provider:
export function RegisterFormProvider({ children }: TGenericProps) {
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      [authKeys.EMAIL]: "",
      [authKeys.PASSWORD]: "",
    },
    mode: "onChange",
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}

// Login Form Provider:
export function LoginFormProvider({ children }: TGenericProps) {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      [authKeys.EMAIL]: "",
      [authKeys.PASSWORD]: "",
    },
    mode: "onChange",
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}

// Register Context:
export function useRegisterContext() {
  const formHook = useFormContext<TRegisterSchema>();
  return useMemo(() => ({ formHook }), [formHook]);
}

// Login Context:
export function useLoginContext() {
  const formHook = useFormContext<TLoginSchema>();
  return useMemo(() => ({ formHook }), [formHook]);
}
