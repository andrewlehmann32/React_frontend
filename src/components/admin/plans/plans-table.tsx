import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaPen, FaRegTrashCan } from "react-icons/fa6";
import { environment } from "../../../config/environment";
import { PlanData } from "../../../types/generics.types";
import { DotsDropdown } from "../../shared/menus/simple-dropdown";
import { Table } from "../../shared/table";
import axios from "./../../../lib/apiConfig";

interface PlansTableProps {
  setIsModalOpen: (value: boolean) => void;
  setModalType: (value: string) => void;
  setPlan: (value: PlanData) => void;
  isModalOpen: boolean;
}

export const PlansTable = ({
  setIsModalOpen,
  setModalType,
  setPlan,
  isModalOpen,
}: PlansTableProps) => {
  const [plans, setPlans] = useState<PlanData[]>([]);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${environment.VITE_API_URL}/plans`);
      setPlans(response?.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [isModalOpen]);

  const handleDelete = async (planId: string) => {
    try {
      const response = await axios.delete(
        `${environment.VITE_API_URL}/plans/${planId}`
      );
      toast.success(response.data.message);
      // Update state after successful deletion
      setPlans((prevPlans) => prevPlans.filter((plan) => plan?._id !== planId));
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const togglePlanStatus = async (planId: string, currentStatus: boolean) => {
    try {
      const response = await axios.put(
        `${environment.VITE_API_URL}/plans/${planId}`,
        { enabled: !currentStatus }
      );
      toast.success(response.data.message);

      // Update the state to reflect the change in UI
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan._id === planId ? { ...plan, enabled: !currentStatus } : plan
        )
      );
    } catch (error) {
      console.error("Error updating plan status:", error);
    }
  };

  const handleEditPlan = (plan: PlanData) => {
    setPlan(plan);
    setIsModalOpen(true);
    setModalType("Edit");
  };

  const handleToggleEnable = (PlanId: string, index: number) => {
    const updatedPlans = [...plans];
    // updatedPlans[index].enabled = !updatedPlans[index].enabled;
    // setPlans(updatedPlans);
    togglePlanStatus(PlanId, updatedPlans[index].enabled);
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
        onClick={() => handleToggleEnable(item._id, index)}
      >
        <FaEye color={item.enabled ? "green" : "gray"} />
        <span>{item.enabled ? "Enabled" : "Disabled"}</span>
      </div>,
      <div
        className={`flex gap-3 items-center text-red-500`}
        key="remove"
        onClick={() => handleDelete(item?._id)}
      >
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

  const renderBody = () => {
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
      status: (
        <p className="font-semibold">
          {item.enabled ? "Available" : "Disabled"}
        </p>
      ),
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
    body: renderBody(),
  };

  return (
    <div className="py-2 gap-2 flex flex-col pr-0 lg:pr-6 w-full mb-20 sm:mb-0">
      <div className="flex w-full overflow-x-auto">
        <Table {...tableData} />
      </div>
    </div>
  );
};
