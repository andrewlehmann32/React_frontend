// Imports:
import { cn } from "../../lib/utils";
import { TImageProps } from "../../types/generics.types";

export default function Image({ src, alt, className }: TImageProps) {
  return <img src={src} alt={alt} className={cn("w-full", className)} />;
}
