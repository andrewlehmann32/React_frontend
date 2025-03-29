import { Form } from "react-hook-form";
import {
  useLoginContext,
  useRegisterContext,
  useResetContext,
  useResetPContext,
} from "../../../contexts/auth";
import { authKeys } from "../../../schemas/auth-schema";
import { GenericInput } from "../../generics/input";
import { Button } from "../../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";

export const RegisterForm = ({ onRegister }: any) => {
  const { formHook } = useRegisterContext();
  return (
    <Form {...formHook}>
      <div className="space-y-5">
        <FormField
          name={authKeys.EMAIL}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <GenericInput
                  type="email"
                  placeholder="Enter your email address"
                  label="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage id={`register-${authKeys.EMAIL}`} />
            </FormItem>
          )}
        />
        <FormField
          name={authKeys.PASSWORD}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <GenericInput
                  type="password"
                  placeholder="Enter your password"
                  label="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage id={`register-${authKeys.PASSWORD}`} />
            </FormItem>
          )}
        />
        <div className="w-full">
          <Button
            className="w-full max-w-full"
            type="submit"
            disabled={!formHook.formState.isValid}
            onClick={formHook.handleSubmit(onRegister)}
          >
            Register
          </Button>
        </div>
      </div>
    </Form>
  );
};

export const LoginForm = ({ setFormState, onLogin }: any) => {
  const { formHook } = useLoginContext();
  return (
    <Form {...formHook}>
      <div className="space-y-5">
        <FormField
          name={authKeys.EMAIL}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <GenericInput
                  type="email"
                  placeholder="Enter your email address"
                  label="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage id={`login-${authKeys.EMAIL}`} />
            </FormItem>
          )}
        />
        <FormField
          name={authKeys.PASSWORD}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <GenericInput
                  type="password"
                  placeholder="Enter your password"
                  label="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage id={`login-${authKeys.PASSWORD}`} />
            </FormItem>
          )}
        />

        <div className="w-full">
          <Button
            className="w-full max-w-full"
            type="submit"
            disabled={!formHook.formState.isValid}
            onClick={formHook.handleSubmit(onLogin)}
          >
            Login
          </Button>
        </div>
      </div>
      <div className="py-2">
        <p
          className=" text-gray-700 hover:text-blue-600 cursor-pointer underline "
          onClick={() => setFormState("reset")}
        >
          Forgot password?
        </p>
      </div>
    </Form>
  );
};

export const ResetForm = ({ onReset }: any) => {
  const { formHook } = useResetContext();

  if (!formHook) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...formHook}>
      <div className="space-y-5">
        <FormField
          name={authKeys.EMAIL}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <GenericInput
                  type="email"
                  placeholder="Enter your email address"
                  label="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage id={`reset-${authKeys.EMAIL}`} />
            </FormItem>
          )}
        />

        <div className="w-full">
          <Button
            className="w-full max-w-full"
            type="submit"
            disabled={!formHook.formState.isValid}
            onClick={formHook.handleSubmit(onReset)}
          >
            Reset Password
          </Button>
        </div>
      </div>
    </Form>
  );
};

export const PasswordResetForm = ({ onConfirm }: any) => {
  const { formHook } = useResetPContext();

  if (!formHook) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...formHook}>
      <div className="space-y-5">
        <FormField
          name={authKeys.PASSWORD}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <GenericInput
                  type="password"
                  placeholder="Enter your password"
                  label="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage id={`resetP-${authKeys.PASSWORD}`} />
            </FormItem>
          )}
        />
        <FormField
          name={authKeys.CONFIRM_PASSWORD}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <GenericInput
                  type="password"
                  placeholder="Confirm your password"
                  label="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage id={`resetP-${authKeys.CONFIRM_PASSWORD}`} />
            </FormItem>
          )}
        />

        <div className="w-full">
          <Button
            className="w-full max-w-full"
            type="submit"
            disabled={!formHook.formState.isValid}
            onClick={formHook.handleSubmit(onConfirm)}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Form>
  );
};

export const TwoFAForm = ({ onConfirm }: any) => {
  const { formHook } = useLoginContext();

  if (!formHook) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...formHook}>
      <div className="space-y-5">
        <FormField
          name={authKeys.TWO_FA_CODE}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <GenericInput
                  type="text"
                  placeholder="Enter your 2FA code"
                  label="Code"
                  {...field}
                />
              </FormControl>
              <FormMessage id={`twofa-${authKeys.TWO_FA_CODE}`} />
            </FormItem>
          )}
        />

        <div className="w-full">
          <Button
            className="w-full max-w-full"
            type="submit"
            disabled={!formHook.formState.isValid}
            onClick={formHook.handleSubmit(onConfirm)}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Form>
  );
};
