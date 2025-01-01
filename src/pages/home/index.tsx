import { useState } from "react";
import { SplitScreen } from "../../components/generics/split-screen";
import { Wrapper } from "../../components/layouts/wrapper";
import { Auth } from "../../components/modules/login/auth";
import { AuthLayer } from "../../components/modules/login/auth-layer";
import { LoginFormProvider, RegisterFormProvider } from "../../contexts/auth";

export default function Home() {
  const [formState, setFormState] = useState<"login" | "register">("login");

  return (
    <Wrapper>
      <SplitScreen
        leftClassName="h-screen w-full p-8 md:p-16 lg:p-32"
        rightClassName="h-screen hidden md:block"
        left={
          formState === "login" ? (
            <LoginFormProvider>
              <Auth type={formState} setFormState={setFormState} />
            </LoginFormProvider>
          ) : (
            <RegisterFormProvider>
              <Auth type={formState} setFormState={setFormState} />
            </RegisterFormProvider>
          )
        }
        right={<AuthLayer />}
      />
    </Wrapper>
  );
}
