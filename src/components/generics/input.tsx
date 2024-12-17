// Imports:
import { forwardRef } from "react";
import { Generics } from "../../types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const GenericInput = forwardRef<HTMLInputElement, Generics.TInputProps>(
  ({ type, placeholder, label, onChange, value, name, ...field }, ref) => {
    return (
      <div className="grid w-full max-w-full items-center gap-1.5">
        <Label htmlFor={label}>{label}</Label>
        <Input
          id={label}
          type={type}
          placeholder={placeholder}
          className="focus-visible:ring-0"
          onChange={onChange}
          value={value}
          name={name}
          ref={ref}
          {...field}
        />
      </div>
    );
  }
);

GenericInput.displayName = "GenericInput";

export default GenericInput;
