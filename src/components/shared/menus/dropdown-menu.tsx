import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";

interface DropdownMenuProps {
  items: {
    label: string;
    disabled?: boolean;
  }[];
  placeholder?: string;
  defaultValue?: string;
}

export const RDropdownMenu = ({
  items,
  placeholder = "choose an option",
  defaultValue,
}: DropdownMenuProps) => {
  const [active, setActive] = useState(defaultValue ?? placeholder);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=" bg-transparent border px-2 py-1 rounded text-gray-600 justify-between gap-16 flex font-normal hover:bg-gray-100 focus-visible:ring-0 shadow-none min-w-60">
          <span>{active}</span>
          <ChevronDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" border bg-white shadow-md rounded-lg p-2 w-48"
        align="start"
        sideOffset={5}
      >
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => setActive(item.label)}
            disabled={item.disabled}
            className={`px-4 py-2 text-sm cursor-pointer rounded-md ${
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
