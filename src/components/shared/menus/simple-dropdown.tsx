import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { DROPDOWN_DIRECTION } from "../../../constants/constants";

interface DotsDropdownProps {
  items: React.ReactNode[]; // Use 'label' instead of 'item'
  id: String;
  direction?: String;
}

export const DotsDropdown = ({
  items,
  id,
  direction = DROPDOWN_DIRECTION.DOWN,
}: DotsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 });

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent global click event from immediately closing
    setIsOpen((prevState) => {
      const newState = !prevState;
      if (newState) {
        // Close other dropdowns
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

    document.addEventListener(
      "closeAllDropdowns",
      handleClose as EventListener
    );
    return () => {
      document.removeEventListener(
        "closeAllDropdowns",
        handleClose as EventListener
      );
    };
  }, [id]);

  return (
    <div className="relative flex justify-center">
      <BsThreeDots
        onClick={toggleDropdown}
        className="text-gray-400 cursor-pointer"
      />
      {isOpen && (
        <div
          className={`${
            direction === DROPDOWN_DIRECTION.DOWN ? "fixed" : "absolute"
          } bg-white border rounded-md shadow-lg z-50 w-40`}
          style={
            direction === DROPDOWN_DIRECTION.DOWN
              ? { top: dropdownStyle.top, left: dropdownStyle.left }
              : { bottom: 40, right: 0 }
          }
        >
          <ul className="py-1">
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
