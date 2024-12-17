// Imports:
import { cn } from "../../lib/utils";
import { Generics } from "../../types";

export default function Wrapper({
  children,
  className,
}: Generics.TGenericProps) {
  return <div className={cn("w-full h-screen", className)}>{children}</div>;
}
