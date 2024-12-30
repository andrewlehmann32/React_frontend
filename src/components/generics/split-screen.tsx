import { mergeClasses } from "../../lib/helpers/utils";
import { Generics } from "../../types";

export const SplitScreen = ({
  left,
  right,
  leftClassName,
  rightClassName,
}: Generics.TSplitScreenProps) => {
  return (
    <div className="flex flex-col sm:flex-row size-full w-full h-full">
      <div className={mergeClasses("w-full h-full", leftClassName)}>{left}</div>
      <div className={mergeClasses("w-full h-full", rightClassName)}>
        {right}
      </div>
    </div>
  );
};
