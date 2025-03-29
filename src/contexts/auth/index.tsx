// Imports:
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  authKeys,
  loginSchema,
  registerSchema,
  resetPSchema,
  resetSchema,
  TLoginSchema,
  TRegisterSchema,
  TResetPSchema,
  TResetSchema,
  TTwoFaSchema,
  twoFaSchema,
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

// Login Form Provider:
export function ResetFormProvider({ children }: TGenericProps) {
  const form = useForm<TResetSchema>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      [authKeys.EMAIL]: "",
    },
    mode: "onChange",
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}

// 2FA Form Provider:
export function TwoFaFormProvider({ children }: TGenericProps) {
  const form = useForm<TTwoFaSchema>({
    resolver: zodResolver(twoFaSchema),
    defaultValues: {
      [authKeys.TWO_FA_CODE]: "",
    },
    mode: "onChange",
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}

// Login Form Provider:
export function ResetPasswordProvider({ children }: TGenericProps) {
  const form = useForm<TResetPSchema>({
    resolver: zodResolver(resetPSchema),
    defaultValues: {
      [authKeys.PASSWORD]: "",
      [authKeys.CONFIRM_PASSWORD]: "",
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

// Reset Context:
export function useResetContext() {
  const formHook = useFormContext<TResetSchema>();
  return useMemo(() => ({ formHook }), [formHook]);
}

// Reset Password Context:
export function useResetPContext() {
  const formHook = useFormContext<TResetSchema>();
  return useMemo(() => ({ formHook }), [formHook]);
}
