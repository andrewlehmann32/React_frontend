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
        leftClassName="h-screen w-full px-4 py-4 md:px-12 md:py-12 lg:px-18 lg:py-18 xl:px-32 "
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
