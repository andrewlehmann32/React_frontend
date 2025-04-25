import { useEffect, useState } from "react";
import { Main } from "../../../components/admin/servers/main";
import { PageLayout } from "../../../components/layouts/pageLayout";
import { ServersList } from "../../../components/resources/servers-list";
import { environment } from "../../../config/environment";
import { Device } from "../../resources";
import axios from "./../../../lib/apiConfig";

const AdminServers = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<Device>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchDevices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering`,
          {
            signal,
          }
        );
        setSelectedId(response.data?.data[0]?.resource?.resourceId);
        setDevices(response.data?.data);
        setSelectedDevice(response.data.data[0]);
      } catch (error) {
        console.error(error);
        // toast.error("Failed to fetch devices");
      } finally {
        setLoading(false);
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
      core: device?.planId?.cpu?.cores,
      ram: device?.planId?.ram,
    }));
    return filtered;
  };

  // Refetch the devices after deleting one
  const refetchDevices = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering`,
          {
            signal,
          }
        );
        setDevices(response.data?.data || []);
        setSelectedId(response.data?.data[0]?.resource?.resourceId);
        setSelectedDevice(response.data?.data[0]);
      } catch (error) {
        console.error(error);
        // toast.error("Failed to fetch devices");
      }
    };

    fetchDevices();

    // Cleanup function: Abort the request if the component unmounts
    return () => {
      controller.abort();
    };
  };

  return (
    <div className="flex flex-col lg:flex-row max-h-screen">
      <ServersList
        devices={filteredDevices()}
        selectedId={selectedId}
        loading={loading}
        setSelectedId={setSelectedId}
      />
      <div className="w-[100%] lg:w-[76%] xl:w-[73%]">
        <PageLayout>
          <Main
            devices={devices}
            selectedId={selectedId}
            selectedDevice={selectedDevice}
            loading={loading}
            setSelectedDevice={setSelectedDevice}
            refetchDevices={refetchDevices}
          />
        </PageLayout>
      </div>
    </div>
  );
};

export default AdminServers;
