import { useState } from "react";
import { Chart } from "../generics/chart";

const DisplayTabs = () => {
  const [selected, setSelected] = useState("Month");
  const items = ["Day", "Month", "Year"];
  const selectedStyles = "bg-white shadow-md hover:bg-white";
  return (
    <div className="px-4 py-1 bg-gray-100 rounded-sm">
      <div className="flex gap-2">
        {items.map((item, index) => (
          <div
            className={`${
              selected === item ? selectedStyles : ""
            } flex-1 text-center py-1 px-3 cursor-pointer hover:bg-gray-200 text-xs rounded-sm`}
            key={index}
            onClick={() => setSelected(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export const MonthlySpendage = () => {
  return (
    <div className="flex flex-col gap-2 text-gray-800 font-medium h-full w-full">
      <div className="flex justify-between items-end ">
        <h1>Monthly Spendage</h1>
        <DisplayTabs />
      </div>
      <div className="flex flex-col border rounded-md px-3 sm:px-6  h-full max-h-96">
        <div className="flex flex-col text-gray-500 text-sm pt-4 font-normal">
          <h4>Monthly Spend</h4>
          <div className="flex gap-16 flex-wrap items-center pt-2">
            <span className="font-semibold text-gray-800">$8.81</span>
            <div className="flex bg-gray-100 px-2 py-1 rounded-sm text-xs ">
              Projected Spend: <span className="px-3">$14.4</span>
            </div>
          </div>
        </div>
        <div className="flex">
          <Chart />
        </div>
      </div>
    </div>
  );
};
