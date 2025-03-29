import { useState } from "react";
import { SplitScreen } from "../../components/generics/split-screen";
import { Wrapper } from "../../components/layouts/wrapper";
import { Auth } from "../../components/modules/login/auth";
import { AuthLayer } from "../../components/modules/login/auth-layer";
import {
  LoginFormProvider,
  RegisterFormProvider,
  ResetFormProvider,
  TwoFaFormProvider,
} from "../../contexts/auth";

export default function Home() {
  const [formState, setFormState] = useState<
    "login" | "register" | "reset" | "2fa"
  >("login");

  return (
    <Wrapper>
      <SplitScreen
        leftClassName="h-screen w-full p-4 md:p-12 xl:p-32"
        rightClassName="h-screen hidden md:block"
        left={
          formState === "reset" ? (
            <ResetFormProvider>
              <Auth type={formState} setFormState={setFormState} />
            </ResetFormProvider>
          ) : formState === "login" ? (
            <LoginFormProvider>
              <Auth type={formState} setFormState={setFormState} />
            </LoginFormProvider>
          ) : formState === "register" ? (
            <RegisterFormProvider>
              <Auth type={formState} setFormState={setFormState} />
            </RegisterFormProvider>
          ) : (
            <TwoFaFormProvider>
              <Auth type={formState} setFormState={setFormState} />
            </TwoFaFormProvider>
          )
        }
        right={<AuthLayer />}
      />
    </Wrapper>
  );
}
