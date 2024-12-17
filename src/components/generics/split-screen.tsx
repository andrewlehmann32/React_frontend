// Imports:
import { cn } from "../../lib/utils";
import { Generics } from "../../types";

export default function SplitScreen({
  left,
  right,
  leftClassName,
  rightClassName,
}: Generics.TSplitScreenProps) {
  return (
    <div className="flex flex-col sm:flex-row size-full">
      <div className={cn("sm:w-1/2 h-full", leftClassName)}>{left}</div>
      <div className={cn("sm:w-1/2 h-full", rightClassName)}>{right}</div>
    </div>
  );
}
