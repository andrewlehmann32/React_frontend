import { FaBomb } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiServerStack } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
import { Table } from "../shared/table";
import { Button } from "../ui/button";

type TableData = {
  headers: string[];
  body: { [key: string]: string | number | any }[];
};

const tableData: TableData = {
  headers: ["Event", "Target", "Project", "Author", "Date"],
  body: [
    {
      event: (
        <div className="flex items-center gap-2">
          <FaBomb />
          <span>servers.destroy</span>
        </div>
      ),
      target: "sv_83737AyUDG8377Ay",
      project: "Subnet Testing",
      author: "johndoe18@gmail.com",
      date: "Dec 1, 2024",
    },
    {
      event: (
        <div className="flex items-center gap-2">
          <HiServerStack />
          <span>reinstall.servers</span>
        </div>
      ),
      target: "sv_83737AyUDG8377Ay",
      project: "Subnet Testing",
      author: "johndoe18@gmail.com",
      date: "Dec 1, 2024",
    },
    {
      event: (
        <div className="flex items-center gap-2">
          <IoPerson />
          <span>profile.creation</span>
        </div>
      ),
      target: "sv_83737AyUDG8377Ay",
      project: "Subnet Testing",
      author: "johndoe18@gmail.com",
      date: "Dec 1, 2024",
    },
    {
      event: (
        <div className="flex items-center gap-2">
          <HiServerStack />
          <span>deploy+config.update</span>
        </div>
      ),
      target: "sv_83737AyUDG8377Ay",
      project: "Subnet Testing",
      author: "johndoe18@gmail.com",
      date: "Dec 1, 2024",
    },
    {
      event: (
        <div className="flex items-center gap-2">
          <FaBomb />
          <span>servers.destroy</span>
        </div>
      ),
      target: "-",
      project: "-",
      author: "johndoe18@gmail.com",
      date: "Dec 1, 2024",
    },
    {
      event: (
        <div className="flex items-center gap-2">
          <HiServerStack />
          <span>reinstall.servers</span>
        </div>
      ),
      target: "-",
      project: "-",
      author: "johndoe18@gmail.com",
      date: "Dec 1, 2024",
    },
    {
      event: (
        <div className="flex items-center gap-2">
          <IoPerson />
          <span>profile.creation</span>
        </div>
      ),
      target: "-",
      project: "-",
      author: "johndoe18@gmail.com",
      date: "Dec 1, 2024",
    },
    {
      event: (
        <div className="flex items-center gap-2">
          <HiServerStack />
          <span>deploy+config.update</span>
        </div>
      ),
      target: "-",
      project: "-",
      author: "johndoe18@gmail.com",
      date: "Dec 1, 2024",
    },
  ],
};

export const Main = () => {
  return (
    <div className="py-2 gap-4 flex flex-col pr-0 lg:pr-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium py-1">Activity Log</h1>
        <div className="flex">
          <Button className="bg-white text-gray-600 shadow-none hover:bg-gray-50 ">
            Sort by Date
          </Button>
          <Button className="bg-white text-gray-600 shadow-none hover:bg-gray-50 ">
            {" "}
            <GoPlus />
            Add Filter
          </Button>
        </div>
      </div>
      <div className="flex w-full overflow-x-auto">
        <Table {...tableData} />
      </div>
    </div>
  );
};
