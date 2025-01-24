import { GoBellFill } from "react-icons/go";
import { menuItems, miscItems } from "../../constants/constants";
import { svgDrawer } from "../../lib/helpers/svgDrawer";

export const Header = ({ title }: { title: string }) => {
  const item =
    menuItems.find((i) => i.identifier === title.toLowerCase()) ??
    miscItems.find((i) => i.identifier === title.toLowerCase());

  return (
    <div className="flex flex-wrap justify-between items-center w-full">
      <div className="hidden sm:flex">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <span className="inline-flex items-center text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900">
              {item?.icon && <item.icon className="w-4 h-4" />}
            </span>
          </li>
          <li>
            <div className="flex items-center">
              {svgDrawer.angleRight}
              <span className="text-sm px-3 font-medium text-gray-700">
                {item?.title}
              </span>
            </div>
          </li>
        </ol>
      </div>
      <div className="flex gap-2 items-center w-full sm:w-fit justify-end sm:justify-between ">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full min-w-80 p-2 ps-10 text-sm text-gray-900 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500  "
            placeholder="Search"
          />
        </div>
        <GoBellFill className="h-6 w-6 text-gray-600" />
      </div>
    </div>
  );
};
