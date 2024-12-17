// Imports:
import * as z from "zod";

export enum authKeys {
  EMAIL = "email",
  PASSWORD = "password",
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

export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
