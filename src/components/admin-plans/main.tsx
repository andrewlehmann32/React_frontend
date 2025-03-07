import { useState } from "react";
import { Table } from "../shared/table";
import { Button } from "../ui/button";
import { CreatePlan } from "./create-plan";

const menuItems = [
  " c2.small.x86",
  " c2.small.x86",
  " c2.small.x86",
  " c2.small.x86",
];

export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderTableItem = () => {
    const data = menuItems.map((item) => ({
      name: (
        <p className="font-semibold cursor-pointer hover:underline">{item}</p>
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
        <div className="flex w-full overflow-x-auto">
          <Table {...tableData} />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mt-4 mr-6 mb-1">
        <div>Resource Plans</div>
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>
          Create New Plan
        </Button>
        <CreatePlan isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
      <RenderTables />
    </>
  );
};
