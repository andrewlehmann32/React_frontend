import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { svgDrawer } from "../../lib/helpers/svgDrawer";
import { Table } from "../shared/table";
import { RenderDetails } from "./detailsPage";
import { environment } from "../../config/environment";

export const Main = () => {
  const [params, setParams] = useSearchParams();
  interface Device {
    name: string;
    cpu: string;
    storage: string;
    status: string;
  }

  const [devices, setDevices] = useState<Device[]>([]);
  const token = localStorage.getItem("token");

  const fetchDevices = async () => {
    try {
      const response = await axios.get(`${environment.VITE_API_URL}/ordering`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setDevices(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch devices");
    }
  };

  useEffect(() => {
    fetchDevices();
    () => {
      setParams("");
    };
  }, []);

  console.log("Devices", devices);
  const tableData = {
    headers: ["Name", "CPU", "RAM", "Storage", "Network", "Price", "Status"],
    body: devices.map((device) => ({
      name: (
        <p
          className="font-semibold cursor-pointer hover:underline"
          onClick={() => setParams({ page: "Metal" })}
        >
          {device.name}
        </p>
      ),
      cpu: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">{device.cpu}</p>
        </div>
      ),
      ram: <p className="font-semibold">32 GB</p>,
      storage: <p className="font-semibold">{device.storage}</p>,
      network: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">1 Gbps</p>
          <p>20 TB</p>
        </div>
      ),
      price: (
        <div className="flex flex-col text-[10px]">
          <p className="font-semibold text-xs">$92/mo</p>
          <p>$0.13/hr</p>
        </div>
      ),
      status: (
        <p className="font-semibold">
          {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
        </p>
      ),
    })),
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
