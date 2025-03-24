import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PageLayout } from "../../components/layouts/pageLayout";
import { Main } from "../../components/resources/main";
import { ServersList } from "../../components/resources/servers-list";
import { environment } from "../../config/environment";
import { useAppSelector } from "../../hooks/redux";
import axios from "../../lib/apiConfig";
import { selectActiveProject } from "../../redux/selectors/userSelector";
import { PlanData, Resource } from "../../types/generics.types";

export interface Device {
  resource: Resource;
  planId: PlanData;
  projectId: string;
  createdAt: Date;
}

const Resources = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [selectedDevice, setSelectedDevice] = useState<Device>();
  const currentProject = useAppSelector(selectActiveProject);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchDevices = async () => {
      if (!currentProject) return;
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering/${currentProject?._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            signal,
          }
        );
        setDevices(response.data?.data);
        setSelectedId(response.data?.data[0]?.resource?.resourceId);
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
  }, [currentProject]); // Re-fetch devices when `currentProject` changes

  // Refetch the devices after deleting one
  const refetchDevices = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchDevices = async () => {
      if (!currentProject) return;
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering/${currentProject?._id}`,
          {
            signal,
          }
        );
        if (response.data?.data.length) {
          const defaultDevice = response.data.data[0]?.resource;
          const previousDevice = response.data.data.find(
            (device: Device) => device.resource.resourceId === selectedId
          );
          if (!previousDevice) {
            setSelectedId(defaultDevice.resourceId);
            setSelectedDevice(defaultDevice);
          } else {
            setSelectedId(previousDevice.resource.resourceId);
            setSelectedDevice(previousDevice);
          }
        }
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
  };

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
            refetchDevices={refetchDevices}
          />
        </PageLayout>
      </div>
    </div>
  );
};

export default Resources;
