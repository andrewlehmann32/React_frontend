import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { DROPDOWN_DIRECTION } from "../../../constants/constants";
import { Button } from "../../ui/button";

interface DropdownMenuProps {
  items: {
    label: string;
    value?: string;
    disabled?: boolean;
  }[];
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  direction?: DROPDOWN_DIRECTION;
  onChange?: (value: string) => void;
}

export const RDropdownMenu = ({
  items,
  placeholder = "Choose an option",
  defaultValue,
  value,
  direction = DROPDOWN_DIRECTION.BOTTOM,
  onChange = () => {},
}: DropdownMenuProps & { value?: string }) => {
  const [active, setActive] = useState(value ?? defaultValue ?? placeholder);

  useEffect(() => {
    if (value) setActive(value);
  }, [value]);

  const handleSelect = (selectedValue: string) => {
    setActive(selectedValue);
    onChange(selectedValue);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent border px-3 py-2 rounded text-gray-600 flex justify-between items-center gap-2 font-normal hover:bg-gray-100 focus-visible:ring-0 shadow-none min-w-60 w-full">
          <span>{active}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border bg-white shadow-md rounded-lg p-2 w-48 max-h-40 overflow-y-scroll divide-y"
        side={direction}
        align={
          direction === "left" || direction === "right" ? "start" : "center"
        }
      >
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => handleSelect(item.value ?? item.label)}
            disabled={item.disabled}
            className={`px-4 py-2 text-sm cursor-pointer ${
              item.disabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
