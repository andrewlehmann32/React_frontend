import { mergeClasses } from "../../lib/helpers/utils";
import { Generics } from "../../types";

export const Wrapper = ({ children, className }: Generics.TGenericProps) => {
  return (
    <div className={mergeClasses("w-full h-screen", className)}>{children}</div>
  );
};
