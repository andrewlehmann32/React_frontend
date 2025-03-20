import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DROPDOWN_DIRECTION, OSItem } from "../../../constants/constants";
import { Button } from "../../ui/button";

interface DropdownMenuProps {
  items: {
    label: string;
    title?: string;
    id?: number;
    value?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
  }[];
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  direction?: DROPDOWN_DIRECTION;
  onChange?: (value: OSItem) => void;
  disabled?: boolean;
}

export const OrderDropdownMenu = ({
  items,
  placeholder = "Choose an option",
  defaultValue,
  value,
  direction = DROPDOWN_DIRECTION.BOTTOM,
  onChange = () => {},
  disabled = false,
}: DropdownMenuProps & { value?: string }) => {
  const [active, setActive] = useState(value ?? defaultValue ?? placeholder);

  useEffect(() => {
    if (value) setActive(value);
  }, [value]);

  const handleSelect = (selectedValue: OSItem) => {
    setActive(selectedValue.title);
    onChange(selectedValue);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={disabled}
          className="bg-transparent border px-3 py-2 rounded text-gray-600 flex justify-between items-center gap-2 font-normal hover:bg-gray-100 focus-visible:ring-0 shadow-none min-w-60 w-full"
        >
          <div className="flex items-center gap-2">
            <span className="flex-shrink-0">
              {!!items &&
                items.find((item) => item.label || item.title === active)?.icon}
            </span>
            <span>{active}</span>
          </div>
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
        {!!items &&
          items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onSelect={() => handleSelect(item)}
              disabled={item.disabled}
              className={`px-4 py-2 text-sm cursor-pointer ${
                item.disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="flex-shrink-0 w-5 h-5">
                  {React.isValidElement(item?.icon) &&
                    React.cloneElement(item?.icon as React.ReactElement, {
                      width: "100%",
                      height: "100%",
                    })}
                </span>
                <span>{item.label}</span>
              </div>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
