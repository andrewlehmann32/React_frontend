import { useAppSelector } from "../../hooks/redux";
import { selectUser } from "../../redux/selectors/userSelector";
import { AveragePerformance } from "./averagePerformance";
import { LatestInvoices } from "./latestInvoices";
import { MonthlySpendage } from "./monthlySpendage";
import { Traffic } from "./traffic";

const elements = [
  <MonthlySpendage />,
  <Traffic />,
  <LatestInvoices />,
  <AveragePerformance />,
];

export const Main = () => {
  const { user } = useAppSelector(selectUser);
  return (
    <>
      <div className="pb-2">
        <div className="flex items-center gap-3 py-3">
          <img
            src={
              user?.avatar?.url ||
              `https://ui-avatars.com/api/?name=${user?.email?.split("@")[0]}`
            }
            alt="workspace"
            className="w-10 h-10"
          />
          <div className="font-medium h-full flex flex-col justify-between">
            <h1 className="text-sm">
              Welcome back, {user?.email?.split("@")[0]}
            </h1>
            <div className="text-xs text-gray-500 pt-1">
              Lorem Ipsum is simply dummy text of the printing
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-4/6">
        {elements.map((elem, index) => (
          <div key={index}>{elem}</div>
        ))}
      </div>
    </>
  );
};
