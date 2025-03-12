import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Main } from "../../../components/admin/servers/main";
import { PageLayout } from "../../../components/layouts/pageLayout";
import { ServersList } from "../../../components/resources/servers-list";
import { environment } from "../../../config/environment";
import { Resource } from "../../../types/generics.types";
import axios from "./../../../lib/apiConfig";

export interface Device {
  resource: Resource;
  projectId: string;
}

const AdminServers = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [selectedDevice, setSelectedDevice] = useState<Device>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            signal,
          }
        );
        setDevices(response.data?.data);
        setSelectedDevice(response.data.data[0]);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch devices");
      }
    };

    fetchDevices();

    // Cleanup function: Abort the request if the component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  const filteredDevices = () => {
    if (!devices.length) return [];
    const filtered = devices.map((device) => ({
      id: Number(device?.resource?.resourceId),
      name: device?.resource?.name,
      ip: device?.resource?.ip,
    }));
    return filtered;
  };

  return (
    <div className="flex flex-col lg:flex-row max-h-screen">
      <ServersList
        devices={filteredDevices()}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <div className="w-[100%] lg:w-[76%] xl:w-[73%]">
        <PageLayout>
          <Main
            devices={devices}
            selectedId={selectedId}
            selectedDevice={selectedDevice}
            setSelectedDevice={setSelectedDevice}
          />
        </PageLayout>
      </div>
    </div>
  );
};

export default AdminServers;
