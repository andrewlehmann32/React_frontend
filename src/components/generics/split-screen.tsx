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
    <div className="flex flex-col sm:flex-row size-full w-full h-full">
      <div className={cn("w-full h-full", leftClassName)}>{left}</div>
      <div className={cn("w-full h-full", rightClassName)}>{right}</div>
    </div>
  );
}
