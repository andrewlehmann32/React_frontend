// Imports:
import { cn } from "../../lib/utils";
import { Generics } from "../../types";

export default function Image({ src, alt, className }: Generics.TImageProps) {
  return <img src={src} alt={alt} className={cn("w-full", className)} />;
}
