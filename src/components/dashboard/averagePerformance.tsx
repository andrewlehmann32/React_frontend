import { MdOutlineArrowOutward } from "react-icons/md";

const items = [
  {
    name: "Ram Deployed",
    storage: "12.5 GB",
    percentage: "13%",
  },
  {
    name: "Cores Deployed",
    storage: "10.5 GB",
    percentage: "19%",
  },
];

export const AveragePerformance = () => {
  return (
    <div className="flex flex-col gap-2 text-gray-800 font-medium mb-20 sm:mb-0 h-full w-full">
      <h1>Average Performance</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 sm:gap-6">
          {items.map((item, index) => (
            <div
              className="border rounded-lg px-5 py-3 sm:w-1/3 flex text-xs flex-col gap-1"
              key={index}
            >
              <p className="text-gray-500">{item.name}</p>
              <div className="flex flex-wrap gap-3 items-center">
                <p className="font-semibold text-lg">{item.storage}</p>
                {/* <span className="bg-green-100 text-[10px] text-green-600 h-fit px-1 py-[2px] rounded-full flex items-center">
                  <MdOutlineArrowOutward className="text-sm" />
                  {item.percentage}
                </span> */}
              </div>
            </div>
          ))}
        </div>
        <div className="text-gray-200 bg-gradient-to-r from-sky-500 to-indigo-500 px-4 sm:px-8 py-4 rounded-xl gap-6 flex flex-col">
          <h1 className="text-white">
            Need more GB? Deploy Resources Instantly
          </h1>
          <p className="text-xs">
            {" "}
            Lorem Ipsum is simply dummy text of the printing, lorem Ipsum is
            simply dummy text of the printing
          </p>
          <div className="flex text-xs items-center gap-6">
            <div className="px-4 text-sm items-center py-2 flex gap-3 bg-white text-black  rounded-lg">
              <span> Order Now</span>
              <MdOutlineArrowOutward />
            </div>
            <p>
              Need Help? <span className="text-white">Contact Support</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
