import { AveragePerformance } from "./averagePerformance";
import { Header } from "./header";
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
  return (
    <div className="flex flex-wrap h-full flex-col pl-4 gap-3 bg-white border rounded-lg p-3">
      <Header />
      <div className="pb-2">
        <div className="flex items-center gap-3 py-3">
          <img
            src="/assets/workspace.png"
            alt="workspace"
            className="w-10 h-10 "
          />
          <div className="font-medium h-full flex flex-col justify-between">
            <h1 className="text-sm">Welcome back, Jese Leos</h1>
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
    </div>
  );
};
