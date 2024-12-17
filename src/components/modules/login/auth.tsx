// Imports:
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useLoginContext, useRegisterContext } from "../../../contexts/auth";
import { useAppDispatch } from "../../../hooks/redux";
import firebase from "../../../lib/firebase";
import {
  useGoogleMutation,
  useLoginMutation,
  useRegisterMutation,
} from "../../../redux/api/user-api";
import {
  clearError,
  clearMessage,
  loginUser,
  loginUserFailure,
  registerUser,
  registerUserFailure,
  signInWithGoogle,
  signInWithGoogleFailure,
} from "../../../redux/reducer/user-reducer";
import {
  authKeys,
  loginSchema,
  registerSchema,
} from "../../../schemas/auth-schema";
import { Home } from "../../../types";
import Divider from "../../generics/divider";
import GenericInput from "../../generics/input";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";

// PARTIALS -
const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();

export default function Auth({ type, setFormState }: Home.AuthProps) {
  const { formHook: registerFormHook } = useRegisterContext();
  const { formHook: loginFormHook } = useLoginContext();
  const [Google] = useGoogleMutation();
  const [Register] = useRegisterMutation();
  const [Login] = useLoginMutation();
  const dispatch = useAppDispatch();

  // Form State Handler:
  const handleFormState = () => {
    setFormState(type === "login" ? "register" : "login");
  };

  // Submit Handler:
  async function onRegister(values: z.infer<typeof registerSchema>) {
    dispatch(clearError());
    dispatch(clearMessage());

    try {
      const { data, error } = await Register({
        email: values.email,
        password: values.password,
      });

      if (data?.success) {
        toast.success("Registered successfully");
        dispatch(registerUser(data?.user));
        registerFormHook.reset();
        return;
      }

      if (error) {
        const { data } = error as unknown as { data: { message: string } };
        toast.error(data?.message);
        dispatch(registerUserFailure(data?.message));
        return;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
      dispatch(registerUserFailure(message));
    }
  }

  // Google Handler:
  async function googleHandler() {
    dispatch(clearError());
    dispatch(clearMessage());

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const { data, error } = await Google({ user: result.user, token });

      if (data?.success) {
        toast.success("Signed in successfully");
        dispatch(signInWithGoogle(data?.user));
        return;
      }

      if (error) {
        const { data } = error as unknown as { data: { message: string } };
        toast.error(data?.message);
        dispatch(signInWithGoogleFailure(data?.message));
        return;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
      dispatch(signInWithGoogleFailure(message));
    }
  }

  // Login Handler:
  async function onLogin(values: z.infer<typeof loginSchema>) {
    dispatch(clearError());
    dispatch(clearMessage());

    try {
      const { data, error } = await Login({
        email: values.email,
        password: values.password,
      });

      if (data?.success) {
        toast.success("Logged in successfully");
        dispatch(loginUser(data?.user));
        loginFormHook.reset();
        return;
      }

      if (error) {
        const { data } = error as unknown as { data: { message: string } };
        toast.error(data?.message);
        dispatch(loginUserFailure(data?.message));
        return;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
      dispatch(loginUserFailure(message));
    }
  }

  return (
    <div className="container w-full h-full overflow-hidden space-y-10 flex flex-col justify-center">
      <div className="w-full text-wrap overflow-auto space-y-2 font-inter">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
          {type === "login" ? "Let's Login" : "Let's Register"}
        </h1>
        <p className="text-sm sm:text-base md:text-md font-medium text-[#000000b3]">
          Please provide your {type === "login" ? "login" : "registeration"}{" "}
          details below
        </p>
      </div>

      <div className="w-full">
        <Button
          className="w-full max-w-full"
          variant={"outline"}
          onClick={googleHandler}
        >
          <FcGoogle />
          {type === "login" ? "Login with Google" : "Register with Google"}
        </Button>
      </div>

      <Divider label="or continue with" />

      <Form {...(type === "login" ? loginFormHook : registerFormHook)}>
        <div className="space-y-5">
          <FormField
            control={
              type === "login"
                ? loginFormHook.control
                : registerFormHook.control
            }
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
                <FormMessage id={`${type}-${authKeys.EMAIL}`} />
              </FormItem>
            )}
          />

          <FormField
            control={
              type === "login"
                ? loginFormHook.control
                : registerFormHook.control
            }
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
                <FormMessage id={`${type}-${authKeys.PASSWORD}`} />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <Button
            className="w-full max-w-full"
            type="submit"
            disabled={
              type === "login"
                ? !loginFormHook.formState.isValid
                : !registerFormHook.formState.isValid
            }
            onClick={
              type === "login"
                ? loginFormHook.handleSubmit(onLogin)
                : registerFormHook.handleSubmit(onRegister)
            }
          >
            {type === "login" ? "Login" : "Register"}
          </Button>
        </div>
      </Form>

      <div className="w-full space-x-1 font-medium text-xs sm:text-sm md:text-base text-center sm:text-left">
        <span className=" text-[#00000080]">
          {type === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}
        </span>
        <span
          className="text-blue-500 cursor-pointer"
          onClick={handleFormState}
        >
          {type === "login" ? "Sign Up" : "Log in"}
        </span>
      </div>
    </div>
  );
}
