// Imports:
import { cn } from "../../lib/utils";
import { TGenericProps } from "../../types/generics.types";

export default function Wrapper({ children, className }: TGenericProps) {
  return <div className={cn("w-full h-screen", className)}>{children}</div>;
}
