import { MdOutlineArrowOutward } from "react-icons/md";
import { Chart } from "../generics/chart";

export const Traffic = () => {
  return (
    <div className="flex flex-col h-full w-full gap-2">
      <div className="flex text-gray-800 font-medium items-end min-h-8 ">
        <div className="items-center flex">
          <h1>Traffic</h1>
          <MdOutlineArrowOutward className="text-sky-600" />
        </div>
      </div>
      <div className="flex flex-col border rounded-md  px-3 sm:px-6 max-h-96 h-full justify-between ">
        <h4 className="text-gray-500 text-sm pt-4 font-normal">Traffic In</h4>
        <div className="flex">
          <Chart />
        </div>
      </div>
    </div>
  );
};
