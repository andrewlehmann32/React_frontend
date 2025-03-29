// Imports:
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { environment } from "../../../config/environment";
import {
  useLoginContext,
  useRegisterContext,
  useResetContext,
} from "../../../contexts/auth";
import { useAppDispatch } from "../../../hooks/redux";
import axios, { setAuthHeader } from "../../../lib/apiConfig";
import firebase from "../../../lib/firebase";
import {
  useGoogleMutation,
  useLoginMutation,
  useRegisterMutation,
} from "../../../redux/api/user-api";
import {
  clearError,
  clearMessage,
  loadUser,
  loadUserFailure,
  loadUserStart,
  registerUser,
  registerUserFailure,
  registerUserStart,
} from "../../../redux/reducer/userSlice";
import {
  authKeys,
  loginSchema,
  registerSchema,
  resetSchema,
  twoFaSchema,
} from "../../../schemas/auth-schema";
import { Divider } from "../../generics/divider";
import { Button } from "../../ui/button";
import { LoginForm, RegisterForm, ResetForm, TwoFAForm } from "./forms";

type AuthProps = {
  type: "login" | "register" | "reset" | "2fa";
  setFormState: (state: "login" | "register" | "reset" | "2fa") => void;
};

// PARTIALS -
const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();

export const Auth = ({ type, setFormState }: AuthProps) => {
  const { formHook: registerFormHook } = useRegisterContext();
  const { formHook: loginFormHook } = useLoginContext();
  const { formHook: resetFormHook } = useResetContext();
  const [Google] = useGoogleMutation();
  const [Register] = useRegisterMutation();
  const [Login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Form State Handler:
  const handleFormState = () => {
    setFormState(type === "login" ? "register" : "login");
  };

  // Submit Handler:
  async function onRegister(values: z.infer<typeof registerSchema>) {
    dispatch(registerUserStart());

    try {
      const { data, error } = await Register({
        email: values.email,
        password: values.password,
      });

      if (data?.success) {
        toast.success("Registered successfully");
        toast.success("An Email with verification link has sent to you");
        dispatch(registerUser(data?.user));
        registerFormHook.reset();
        handleFormState();
        return;
      }

      if (error) {
        const { data } = error as unknown as { data: { message: string } };
        toast.error(data?.message);
        dispatch(registerUserFailure(data?.message));
        dispatch(clearMessage());
        dispatch(clearError());
        return;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
      dispatch(registerUserFailure(message));
      dispatch(clearMessage());
      dispatch(clearError());
    }
  }

  // Google Handler:
  async function googleHandler() {
    dispatch(loadUserStart());

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const { data } = await Google({ user: result.user, token });

      if (data?.success) {
        toast.success("Signed in successfully");
        dispatch(loadUser(data?.user));
        setAuthHeader(token);
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", data?.user?.role);
        localStorage.setItem("id", JSON.stringify(data?.user?._id));
        navigate(data?.user?.role === "admin" ? "/admin/home" : "/home", {
          replace: true,
        });
        return;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
      dispatch(loadUserFailure(message));
      dispatch(clearMessage());
      dispatch(clearError());
    }
  }

  // Login Handler:
  async function onLogin(values: z.infer<typeof loginSchema>) {
    try {
      const { data, error } = await Login({
        email: values.email,
        password: values.password,
      });
      console.log(data);
      if (data?.success) {
        console.log("first");
        toast.success(data?.message);
        localStorage.setItem("id", JSON.stringify(data?.user?.id));
        setFormState("2fa");
        // toast.success("Logged in successfully");
        // dispatch(loadUser(data?.user));
        // setAuthHeader(data?.token);
        // localStorage.setItem("token", data?.token);
        // localStorage.setItem("userRole", data?.user?.role);
        // localStorage.setItem("id", JSON.stringify(data?.user?._id));
        // navigate(data?.user?.role === "admin" ? "/admin/home" : "/home", {
        //   replace: true,
        // });
        loginFormHook.reset();
      }

      if (error) {
        const { data } = error as unknown as { data: { message: string } };
        toast.error(data?.message);
        dispatch(clearError());
        return;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
      dispatch(clearError());
    }
  }

  //2FA Handler:
  async function onConfirm(values: z.infer<typeof twoFaSchema>) {
    dispatch(loadUserStart());

    try {
      const response = await axios.post(
        `${environment.VITE_API_URL}/user/verify-2fa`,
        {
          code: values[authKeys.TWO_FA_CODE],
          userId: localStorage.getItem("id")
            ? JSON.parse(localStorage.getItem("id") || "")
            : "",
        }
      );

      if (response.data?.success) {
        const { data } = response;
        toast.success("Logged in successfully");
        dispatch(loadUser(data?.user));
        setAuthHeader(data?.token);
        localStorage.setItem("token", data?.token);
        localStorage.setItem("userRole", data?.user?.role);
        localStorage.setItem("id", JSON.stringify(data?.user?._id));
        navigate(data?.user?.role === "admin" ? "/admin/home" : "/home", {
          replace: true,
        });
        loginFormHook.reset();
        return;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
      dispatch(loadUserFailure(message));
      dispatch(clearMessage());
      dispatch(clearError());
    }
  }

  // Login Handler:
  async function onReset(value: z.infer<typeof resetSchema>) {
    dispatch(loadUserStart());

    try {
      const response = await axios.post(
        `${environment.VITE_API_URL}/user/reset-password`,
        {
          email: value.email,
        }
      );
      if (response.data?.success) {
        toast.success("Please check your email to reset your password");
        navigate("/", {
          replace: true,
        });
        resetFormHook.reset();
        return;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
      dispatch(loadUserFailure(message));
      dispatch(clearMessage());
      dispatch(clearError());
    }
  }

  return (
    <div className="container w-full h-full overflow-hidden space-y-4 lg:space-y-10 flex flex-col justify-center">
      <div className="w-full text-wrap space-y-2 font-inter">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
          {type === "reset"
            ? "Let's reset your password"
            : type === "login"
            ? "Let's Login"
            : type === "register"
            ? "Let's Register"
            : "Provide 2FA code sent to you"}
        </h1>
        <p className="text-sm sm:text-base md:text-md font-medium text-[#000000b3]">
          Please provide your{" "}
          {type === "reset"
            ? "email"
            : type === "login"
            ? "login details"
            : type === "register"
            ? "registeration details"
            : "2FA code"}{" "}
          below
        </p>
      </div>
      {type !== "reset" && type !== "2fa" && (
        <>
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
        </>
      )}

      {type === "reset" ? (
        <ResetForm onReset={onReset} />
      ) : type === "login" ? (
        <LoginForm onLogin={onLogin} setFormState={setFormState} />
      ) : type === "register" ? (
        <RegisterForm onRegister={onRegister} />
      ) : (
        <TwoFAForm onConfirm={onConfirm} />
      )}

      <div className="w-full space-x-1 font-medium text-xs sm:text-sm md:text-base text-center sm:text-left pb-1">
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
};
