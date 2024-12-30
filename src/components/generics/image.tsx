// Imports:
import { mergeClasses } from "../../lib/helpers/utils";
import { Generics } from "../../types";

export const Image = ({ src, alt, className }: Generics.TImageProps) => {
  return (
    <img src={src} alt={alt} className={mergeClasses("w-full", className)} />
  );
};
