// Imports:
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useAuthContext } from "../../../contexts/auth";
import { authKeys, authSchema } from "../../../schemas/auth-schema";
import { AuthProps } from "../../../types/home.types";
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

export default function Auth({ type }: AuthProps) {
  const [formState, setFormState] = useState<string>(type);
  const { formHook } = useAuthContext();

  const handleFormState = () => {
    setFormState((prev) => (prev === "login" ? "register" : "login"));
  };

  const onSubmit = (values: z.infer<typeof authSchema>) => {
    console.log("DATA: ----->", values);
  };

  return (
    <div className="container w-full h-full overflow-hidden space-y-10 flex flex-col justify-center">
      <div className="w-full text-wrap overflow-auto space-y-2 font-inter">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
          {formState === "login" ? "Let's Login" : "Let's Register"}
        </h1>
        <p className="text-sm sm:text-base md:text-md font-medium text-[#000000b3]">
          Please provide your{" "}
          {formState === "login" ? "login" : "registeration"} details below
        </p>
      </div>

      <div className="w-full">
        <Button className="w-full max-w-full" variant={"outline"}>
          <FcGoogle />
          {formState === "login" ? "Login with Google" : "Register with Google"}
        </Button>
      </div>

      <Divider label="or continue with" />

      <Form {...formHook}>
        <div className="space-y-5">
          <FormField
            control={formHook.control}
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
            control={formHook.control}
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
            disabled={!formHook.formState.isValid}
            onClick={formHook.handleSubmit(onSubmit)}
          >
            {formState === "login" ? "Login" : "Register"}
          </Button>
        </div>
      </Form>

      <div className="w-full space-x-1 font-medium text-xs sm:text-sm md:text-base text-center sm:text-left">
        <span className=" text-[#00000080]">
          {formState === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}
        </span>
        <span
          className="text-blue-500 cursor-pointer"
          onClick={handleFormState}
        >
          {formState === "login" ? "Sign Up" : "Log in"}
        </span>
      </div>
    </div>
  );
}
