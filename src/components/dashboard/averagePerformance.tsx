import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { environment } from "../../config/environment";
import { useAppSelector } from "../../hooks/redux";
import { selectUser } from "../../redux/selectors/userSelector";

export const AveragePerformance = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectUser);
  const [items, setItems] = useState([
    { name: "Ram Deployed", value: "N/A" },
    { name: "Cores Deployed", value: "N/A" },
  ]);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering/${user?._id}/performance`
        );

        const { totalRam, totalCores } = response?.data?.data ?? {
          totalRam: "N/A",
          totalCores: "N/A",
        };

        console.log({ response });
        setItems([
          { name: "Ram Deployed", value: `${totalRam} GB` },
          {
            name: "Cores Deployed",
            value: `${totalCores} Cores`,
          },
        ]);
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };
    fetchPerformanceData();
  }, []);

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
                <p className="font-semibold text-lg">{item.value}</p>
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
              <span
                className="cursor-pointer"
                onClick={() => navigate("/ordering")}
              >
                {" "}
                Order Now
              </span>
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
