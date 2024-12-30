import { HiOutlineDuplicate } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { ToggleButton } from "../shared/buttons/buttons";
import { RDropdownMenu } from "../shared/menus/dropdown-menu";
import { DotsDropdown } from "../shared/menus/simple-dropdown";
import { Table } from "../shared/table";
import { Button } from "../ui/button";

const menuItems = [
  { label: "Administrator" },
  { label: "Owner" },
  { label: "User" },
];

const actionMenuItems = [
  <div className="flex gap-3 items-center" key="duplicate">
    <HiOutlineDuplicate />
    <span>Duplicate</span>
  </div>,
  <div className="flex gap-3 items-center text-red-500" key="remove">
    <FaRegTrashCan />
    <span>Remove User</span>
  </div>,
];

const tableData = {
  headers: ["User", "Role", "Created", "Last", "Action"],
  body: [
    {
      user: (
        <div className="flex gap-3 items-center">
          <div className="h-7 w-7 rounded-full bg-gray-300"></div>
          <div className="py-1 text-xs text-gray-500">
            <div className="font-medium text-gray-600">Jese Leos</div>
            <div>jeseleos@gmail.com</div>
          </div>
        </div>
      ),
      role: <RDropdownMenu items={menuItems} />,
      created: "Dec 12, 2024",
      last: "Oct 2, 2024",
      action: <DotsDropdown items={actionMenuItems} id="1" />,
    },
    {
      user: (
        <div className="flex gap-3 items-center">
          <div className="h-7 w-7 rounded-full bg-gray-300"></div>
          <div className="py-1 text-xs text-gray-500">
            <div className="font-medium text-gray-600">Alex Doe</div>
            <div>alexdoe@gmail.com</div>
          </div>
        </div>
      ),
      role: <RDropdownMenu items={menuItems} />,
      created: "Dec 22, 2024",
      last: "Jan 2, 2024",
      action: <DotsDropdown items={actionMenuItems} id="2" />,
    },
    {
      user: (
        <div className="flex gap-3 items-center">
          <div className="h-7 w-7 rounded-full bg-gray-300"></div>
          <div className="py-1 text-xs text-gray-500">
            <div className="font-medium text-gray-600">Jamie Lee</div>
            <div>jamielee@gmail.com</div>
          </div>
        </div>
      ),
      role: <RDropdownMenu items={menuItems} />,
      created: "Dec 16, 2024",
      last: "Nov 11, 2024",
      action: <DotsDropdown items={actionMenuItems} id="3" />,
    },
  ],
};

export const Main = () => {
  return (
    <div className="py-2 gap-4 flex flex-col pr-0 lg:pr-6 w-full">
      <h1 className="text-xl font-medium py-1">Team Members</h1>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="w-full sm:w-9/12 flex gap-3 items-start">
          <ToggleButton />
          <div className="flex flex-col text-xs text-gray-500 gap-1">
            <h5 className="font-medium text-gray-600">
              Enforce Multi Factor Authentication (MFA)
            </h5>
            <p>
              Require MFA from all team members to improve security by using
              multiple authentication methods
            </p>
          </div>
        </div>
        <Button>Invite Members</Button>
      </div>
      <div className="flex w-full overflow-x-auto">
        <Table {...tableData} />
      </div>
    </div>
  );
};
