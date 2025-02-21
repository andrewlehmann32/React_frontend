import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { svgDrawer } from "../../lib/helpers/svgDrawer";
import { Table } from "../shared/table";
import { RenderDetails } from "./detailsPage";

const menuItems = [
  " c2.small.x86",
  " c2.small.x86",
  " c2.small.x86",
  " c2.small.x86",
];

export const Main = () => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    () => {
      setParams("");
    };
  }, []);

  const renderTableItem = () => {
    const data = menuItems.map((item) => ({
      name: (
        <p
          className="font-semibold cursor-pointer hover:underline"
          onClick={() => setParams({ page: "Metal" })}
        >
          {item}
        </p>
      ),
      cpu: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">E-2173G</p>
          <p>6 Cores @ 3.7 GHz</p>
        </div>
      ),
      ram: <p className="font-semibold">32 GB</p>,
      storage: <p className="font-semibold">500 GB SSD</p>,
      network: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">1 Gbps</p>
          <p> 20 TB</p>
        </div>
      ),
      price: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">$92/mo</p>
          <p> $0.13/hr</p>
        </div>
      ),
      status: <p className="font-semibold">Available</p>,
    }));

    return data;
  };

  const tableData = {
    headers: ["Name", "CPU", "RAM", "Storage", "Network", "Price", "Status"],
    body: renderTableItem(),
  };

  const RenderTables = () => {
    return (
      <div className="py-2 gap-2 flex flex-col pr-0 lg:pr-6 w-full mb-20 sm:mb-0">
        <h1 className="text-xl font-medium py-1">Order Server</h1>
        <div className="flex items-center gap-2">
          <div className="py-1"> {svgDrawer.metal}</div>
          <div className="flex flex-col text-xs text-gray-500 py-1">
            <h1 className="text-base font-semibold text-gray-800">Metal</h1>
            <p>High Performance Servers</p>
          </div>
        </div>
        <div className="flex w-full overflow-x-auto">
          <Table {...tableData} />
        </div>
        <div className="flex items-center gap-2">
          <div className="py-1">{svgDrawer.network}</div>
          <div className="flex flex-col text-xs text-gray-500 py-1">
            <h1 className="text-base font-semibold text-gray-800">
              Networking
            </h1>
            <p>High Performance Servers</p>
          </div>
        </div>
        <div className="flex w-full overflow-x-auto">
          <Table {...tableData} />
        </div>
      </div>
    );
  };

  const DisplayComponents = () => {
    const page = params.get("page");
    if (!page?.length) return <RenderTables />;
    return <RenderDetails />;
  };

  return <DisplayComponents />;
};
