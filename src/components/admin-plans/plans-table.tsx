import { useState } from "react";
import { FaEye, FaPen, FaRegTrashCan } from "react-icons/fa6";
import { initialPlansData } from "../../constants/constants";
import { PlanData } from "../../types/generics.types";
import { DotsDropdown } from "../shared/menus/simple-dropdown";
import { Table } from "../shared/table";

interface PlansTableProps {
  setIsModalOpen: (value: boolean) => void;
  setModalType: (value: string) => void;
  setPlan: (value: PlanData) => void;
}

export const PlansTable = ({
  setIsModalOpen,
  setModalType,
  setPlan,
}: PlansTableProps) => {
  const [plans, setPlans] = useState(initialPlansData);

  const handleEditPlan = (plan: PlanData) => {
    setPlan(plan);
    setIsModalOpen(true);
    setModalType("Edit");
  };

  const handleToggleEnable = (index: number) => {
    const updatedPlans = [...plans];
    updatedPlans[index].enabled = !updatedPlans[index].enabled;
    setPlans(updatedPlans);
  };

  const dropdownItems = (item: PlanData, index: number) => {
    return [
      <div
        className={`flex gap-3 items-center`}
        key="edit"
        onClick={() => handleEditPlan(item)}
      >
        <FaPen />
        <span>Edit Plan</span>
      </div>,
      <div
        className={`flex gap-3 items-center cursor-pointer`}
        key="view"
        onClick={() => handleToggleEnable(index)}
      >
        <FaEye color={item.enabled ? "green" : "gray"} />
        <span>{item.enabled ? "Enabled" : "Disabled"}</span>
      </div>,
      <div className={`flex gap-3 items-center`} key="remove">
        <FaRegTrashCan />
        <span>Delete Plan</span>
      </div>,
    ];
  };

  const tableHeaders = () => {
    return [
      "Name",
      "CPU",
      "RAM",
      "Storage",
      "Network",
      "Price",
      "Status",
      "Actions",
    ];
  };

  const tableBody = () => {
    // if (!plans.length)
    //   return (
    //     <p className="text-lg text-medium text-gray-800">No data to display</p>
    //   );

    const data = plans.map((item, index) => ({
      name: (
        <p className="font-semibold cursor-pointer hover:underline">
          {item.name}
        </p>
      ),
      cpu: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">{item.cpu.name}</p>
          <p>
            {item.cpu.cores} Cores @ {item.cpu.speed} GHz
          </p>
        </div>
      ),
      ram: <p className="font-semibold">{item.ram} GB</p>,
      storage: <p className="font-semibold">{item.storage} GB SSD</p>,
      network: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">{item.network.speed} Gbps</p>
          <p>{item.network.total} TB</p>
        </div>
      ),
      price: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">${item.price.monthly}/mo</p>
          <p>${item.price.hourly}/hr</p>
        </div>
      ),
      status: <p className="font-semibold">Available</p>,
      actions: (
        <DotsDropdown
          items={dropdownItems(item, index)}
          id={index.toString()}
          isSidebarCollapsed={false}
        />
      ),
    }));
    return data;
  };

  const tableData = {
    headers: tableHeaders(),
    body: tableBody(),
  };

  return (
    <div className="py-2 gap-2 flex flex-col pr-0 lg:pr-6 w-full mb-20 sm:mb-0">
      <div className="flex w-full overflow-x-auto">
        <Table {...tableData} />
      </div>
    </div>
  );
};
