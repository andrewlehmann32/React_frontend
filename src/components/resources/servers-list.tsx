import axios from "axios";
import { memo, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { environment } from "../../config/environment";
import { Button } from "../ui/button";

interface Device {
  id: number;
  name: string;
  cpu: string;
}

const ServerItem = memo(
  ({ server, selectedId, setSelectedId, isLastItem, isFirstItem }: any) => {
    const isSelected = selectedId === server.id;
    const selectedItemStyles = isSelected ? "bg-white rounded-lg" : "";

    return (
      <div
        key={server.id}
        className={`py-5 min-h-[80px] ${selectedItemStyles}  ${
          !isFirstItem && !isLastItem && !isSelected ? "border-y" : ""
        }
        `}
        onClick={() => setSelectedId(server.id)}
        role="button"
        aria-selected={isSelected}
      >
        <div className="flex lg:flex-col lg:gap-2 xl:flex-row justify-between items-center text-xs px-2">
          <div>
            <p className="text-md font-semibold mb-1">{server.cpu}</p>
            <p className="text-gray-600">{server.ip}</p>
          </div>
          <div className="mt-2 px-3 py-1 text-gray-500 bg-gray-200 rounded-lg inline-block text-xs font-medium">
            1 Core, 12 GB
          </div>
        </div>
      </div>
    );
  }
);

export const ServersList = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Append unique IDs dynamically
          const devicesWithIds = response.data.data.map(
            (device: any, index: number) => ({
              id: index + 1,
              name: device.name,
              cpu: device.cpu,
              ip: device.ip,
            })
          );

          setDevices(devicesWithIds);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch devices");
      }
    };

    fetchDevices();
  }, []);

  return (
    <div className="w-[100%] lg:w-[24%] xl:w-[27%] p-3">
      <div className="flex flex-col p-3 lg:border-l min-h-full">
        <Button className="max-w-12">+</Button>
        <h1 className="mt-4 mb-1 text-gray-500 text-sm">
          Active Servers ({devices.length})
        </h1>
        <div className="flex flex-col">
          {devices.map((server, index) => (
            <ServerItem
              key={server.id}
              server={server}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              isLastItem={index === devices.length - 1}
              isFirstItem={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
