import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PageLayout } from "../../components/layouts/pageLayout";
import { Main } from "../../components/resources/main";
import { ServersList } from "../../components/resources/servers-list";
import { environment } from "../../config/environment";
import { useAppSelector } from "../../hooks/redux";
import { selectActiveProject } from "../../redux/selectors/userSelector";

export interface Device {
  id: number;
  name: string;
  password: string;
  ip: string;
  price: string;
  status: string;
  username: string;
  hostname: string;
  os: string;
}

const Resources = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const currentProject = useAppSelector(selectActiveProject);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering/${currentProject?._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            signal,
          }
        );
        setDevices(response.data?.data);
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
      id: device?.id,
      name: device?.name,
      ip: device?.ip,
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

export default Resources;
