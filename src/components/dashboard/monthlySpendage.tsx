import { useEffect, useState } from "react";
import { environment } from "../../config/environment";
import { useAppSelector } from "../../hooks/redux";
import axios from "../../lib/apiConfig";
import { selectUser } from "../../redux/selectors/userSelector";
import { SpecificationsChart } from "../resources/specifications-chart";
import { ChartData } from "./trafficChart";

export interface SpendType {
  monthlySpend?: { current: number; expected: number };
  yearlySpend?: { current: number; expected: number };
}

const DisplayTabs = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (value: string) => void;
}) => {
  const items = ["Month", "Year"];
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
  const { user } = useAppSelector(selectUser);
  const [spendage, setSpendage] = useState<SpendType>();
  const [selectedTab, setSelectedTab] = useState("Month");

  useEffect(() => {
    const fetchMonthlySpendage = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering/${user?._id}/spendage`
        );
        setSpendage(response?.data?.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchMonthlySpendage();
  }, []);

  const getChartData = (): ChartData[] => {
    const mapSpendage = (current: number, expected: number): ChartData[] => [
      { name: "Current", value: current },
      { name: "Expected", value: expected },
    ];

    if (selectedTab === "Month") {
      return spendage?.monthlySpend
        ? mapSpendage(
            spendage.monthlySpend.current,
            spendage.monthlySpend.expected
          )
        : [];
    } else if (selectedTab === "Year") {
      return spendage?.yearlySpend
        ? mapSpendage(
            spendage.yearlySpend.current,
            spendage.yearlySpend.expected
          )
        : [];
    }
    return [];
  };

  return (
    <div className="flex flex-col gap-2 text-gray-800 font-medium h-full w-full">
      <div className="flex justify-between items-end ">
        <h1>{selectedTab} Spendage</h1>
        <DisplayTabs selected={selectedTab} setSelected={setSelectedTab} />
      </div>
      <div className="flex flex-col border rounded-md px-3 sm:px-6  h-full max-h-96">
        <div className="flex flex-col text-gray-500 text-sm pt-4 font-normal">
          <h4>{selectedTab} Spend</h4>
        </div>
        <div>
          <SpecificationsChart layout="vertical" chartData={getChartData()} />
        </div>
      </div>
    </div>
  );
};
