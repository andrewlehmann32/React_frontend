// Imports:
import * as z from "zod";

export enum authKeys {
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = 'confirm_password'
}

export const registerSchema = z.object({
  [authKeys.EMAIL]: z
    .string()
    .nonempty({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  [authKeys.PASSWORD]: z
    .string()
    .nonempty({
      message: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
});

export const loginSchema = z.object({
  [authKeys.EMAIL]: z
    .string()
    .nonempty({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),

  [authKeys.PASSWORD]: z.string().nonempty({
    message: "Password is required",
  }),
});

export const resetSchema = z.object({
  [authKeys.EMAIL]: z
    .string()
    .nonempty({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
});

export const resetPSchema = z.object({
  [authKeys.PASSWORD]: z.string().min(1, {
    message: "Password is required",
  }),
  [authKeys.CONFIRM_PASSWORD]: z.string().min(1, {
    message: "Password is required",
  }),
}).refine(data => data[authKeys.PASSWORD] === data[authKeys.CONFIRM_PASSWORD], {
  message: "Passwords must match",
  path: [authKeys.CONFIRM_PASSWORD],
});


export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
export type TResetSchema = z.infer<typeof resetSchema>;
export type TResetPSchema = z.infer<typeof resetPSchema>;
