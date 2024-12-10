// Imports:
import SplitScreen from "../../components/generics/split-screen";
import Wrapper from "../../components/layouts/wrapper";
import Auth from "../../components/modules/login/auth";
import AuthLayer from "../../components/modules/login/auth-layer";
import { AuthFormProvider } from "../../contexts/auth";

export default function Home() {
  return (
    <Wrapper>
      <SplitScreen
        leftClassName="h-screen w-full p-8 md:p-16 lg:p-32"
        rightClassName="h-screen hidden md:block"
        left={
          <AuthFormProvider>
            <Auth type="login" />
          </AuthFormProvider>
        }
        right={<AuthLayer />}
      />
    </Wrapper>
  );
}
