import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { environment } from "../../config/environment";
import axios from "../../lib/apiConfig";
import { svgDrawer } from "../../lib/helpers/svgDrawer";
import { PlanData } from "../../types/generics.types";
import { Table } from "../shared/table";
import { RenderDetails } from "./detailsPage";

export const Main = () => {
  const [params, setParams] = useSearchParams();
  const [plans, setPlans] = useState<PlanData[]>([]);

  console.log("plans", plans);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${environment.VITE_API_URL}/plans`);
        setPlans(response?.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    () => {
      setParams("");
    };
  }, []);

  const renderTableItem = () => {
    const data = plans.map((plan) => ({
      name: (
        <p
          className="font-semibold cursor-pointer hover:underline"
          onClick={() => setParams({ plan: plan._id })}
        >
          {plan.name}
        </p>
      ),
      cpu: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">{plan.cpu.name}</p>
          <p>
            {plan.cpu.cores} Cores @ {plan.cpu.speed} GHz
          </p>
        </div>
      ),
      ram: <p className="font-semibold">{plan.ram} GB</p>,
      storage: <p className="font-semibold">{plan.storage} GB SSD</p>,
      network: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">{plan.network.speed} Gbps</p>
          <p>{plan.network.total} TB</p>
        </div>
      ),
      price: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">${plan.price.monthly}/mo</p>
          <p>${plan.price.hourly}/hr</p>
        </div>
      ),
      status: (
        <p className="font-semibold">
          {plan.enabled ? "Available" : "Unavailable"}
        </p>
      ),
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
        {/* <div className="flex items-center gap-2">
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
        </div> */}
      </div>
    );
  };

  const DisplayComponents = () => {
    const page = params.get("plan");
    if (!page?.length) return <RenderTables />;
    const selectedPlan = plans.find((plan) => plan._id === page);
    if (!selectedPlan) return <div>Plan not found</div>;
    return <RenderDetails plan={selectedPlan} />;
  };

  return <DisplayComponents />;
};
