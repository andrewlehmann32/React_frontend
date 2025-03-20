import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { DROPDOWN_DIRECTION } from "../../../constants/constants";

interface DotsDropdownProps {
  items: React.ReactNode[];
  id: String;
  direction?: String;
  isSidebarCollapsed: boolean;
}

export const DotsDropdown = ({
  items,
  id,
  direction = DROPDOWN_DIRECTION.BOTTOM,
  isSidebarCollapsed,
}: DotsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen((prevState) => {
      const newState = !prevState;
      if (newState) {
        document.dispatchEvent(
          new CustomEvent("closeAllDropdowns", { detail: id })
        );
      }
      return newState;
    });

    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownStyle({
      top: rect.bottom + window.scrollY,
      left: rect.right - 160 + window.scrollX,
    });
  };

  useEffect(() => {
    const handleClose = (event: CustomEvent) => {
      if (event.detail !== id) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "closeAllDropdowns",
      handleClose as EventListener
    );
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "closeAllDropdowns",
        handleClose as EventListener
      );
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id]);

  useEffect(() => {
    if (isSidebarCollapsed) {
      setIsOpen(false);
    }
  }, [isSidebarCollapsed]);

  return (
    <div className="relative flex justify-center" ref={dropdownRef}>
      {!isSidebarCollapsed && (
        <BsThreeDots
          onClick={toggleDropdown}
          className="text-gray-400 cursor-pointer"
        />
      )}
      {isOpen && !isSidebarCollapsed && (
        <div
          className={`${
            direction === DROPDOWN_DIRECTION.BOTTOM ? "fixed" : "absolute"
          } bg-white border rounded-md shadow-lg z-50 w-40`}
          style={
            direction === DROPDOWN_DIRECTION.BOTTOM
              ? { top: dropdownStyle.top, left: dropdownStyle.left }
              : { bottom: 40, left: 10 }
          }
        >
          <ul className="py-1 divide-y">
            {items.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
