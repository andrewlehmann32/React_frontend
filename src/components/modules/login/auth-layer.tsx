import { Image } from "../../generics/image";

export const AuthLayer = () => {
  return (
    <div className="container h-full overflow-hidden flex items-center justify-center">
      <Image
        src="/assets/auth-layer.png"
        alt="login-layer"
        className="w-full max-w-full"
      />
    </div>
  );
};
