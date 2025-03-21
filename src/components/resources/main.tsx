import { useEffect } from "react";
import { countryFlags } from "../../constants/constants";
import { useAppSelector } from "../../hooks/redux";
import { formatTimestamp } from "../../lib/helpers/utils";
import { Device } from "../../pages/resources";
import { selectActiveProject } from "../../redux/selectors/userSelector";
import { DisplayPageHeader } from "./display-page-header";
import { DisplayChart, DisplaySpecificaions } from "./display-specifications";

export interface ResourcDataType {
  properties: { title: string; value: string; icon?: React.ReactNode }[];
  hardware: { title: string; value: string }[];
  credentials: { title: string; value: string }[];
  billing: number | string;
}

export const Main = ({
  devices,
  selectedId,
  selectedDevice,
  setSelectedDevice,
  refetchDevices,
}: {
  devices: Device[];
  selectedId: number | null;
  selectedDevice: Device | undefined;
  setSelectedDevice: (device: Device) => void;
  refetchDevices: () => void;
}) => {
  const currentProject = useAppSelector(selectActiveProject);
  console.log("selected device", selectedDevice);

  useEffect(() => {
    if (selectedId !== null) {
      const device = devices.find(
        (device) => device.resource.resourceId === selectedId
      );
      if (device) setSelectedDevice(device);
    }
  }, [selectedId, devices, setSelectedDevice]);

  if (!currentProject) return;
  if (!devices.length)
    return (
      <p className="text-center text-gray-500 mt-80 text-xl font-medium">
        Nothing to show here
      </p>
    );

  const location = countryFlags.find(
    (flag) => flag.id === selectedDevice?.resource?.location?.id
  );

  const dynamicData = {
    properties: [
      {
        title: "Host name",
        value: selectedDevice?.resource.hostname || "Unknown",
      },
      { title: "Main IP", value: selectedDevice?.resource?.ip || "Unknown" },
      {
        title: "Created",
        value: formatTimestamp(
          selectedDevice?.resource?.createdAt ?? new Date()
        ),
      },
      {
        title: "Location",
        value: location?.title || "Unknown",
        icon: location?.icon,
      },
      {
        title: "Status",
        value: selectedDevice?.resource?.devicePowerStatus || "Unknown",
      },
      { title: "OS", value: selectedDevice?.resource?.os || "Unknown" },
      { title: "Tags", value: "Add tags..." },
    ],
    hardware: [
      { title: "CPU", value: selectedDevice?.planId?.cpu?.name || "Unknown" },
      {
        title: "RAM",
        value: selectedDevice?.planId?.ram
          ? `${selectedDevice?.planId?.ram} GB`
          : "Unknown",
      },
      {
        title: "Disk",
        value: selectedDevice?.planId?.storage
          ? `${selectedDevice?.planId?.storage} GB`
          : "Unknown",
      },
      {
        title: "NIC",
        value: selectedDevice?.planId?.network?.speed
          ? `${selectedDevice?.planId?.network?.speed} Gbit/s`
          : "Unknown",
      },
    ],
    credentials: [
      {
        title: "Username",
        value: selectedDevice?.resource?.username || "Unknown",
      },
      {
        title: "Password",
        value: selectedDevice?.resource?.password || "Unknown",
      },
      {
        title: "Login Snippet",
        value: `ssh ${selectedDevice?.resource?.username}@${selectedDevice?.resource?.ip}`,
      },
    ],
    billing: selectedDevice?.planId?.price?.hourly ?? "N/A",
  };

  if (!selectedDevice) {
    return (
      <div className="w-full h-screen  justify-center items-center text-center flex">
        <div> Loading...</div>
      </div>
    );
  }

  return (
    <div className="py-2 gap-2 flex flex-col pr-0 lg:pr-6 w-full max-h-full h-[45rem] overflow-scroll">
      <DisplayPageHeader
        id={Number(selectedDevice?.resource?.resourceId)}
        serverId={Number(selectedDevice?.resource?.serverId)}
        name={selectedDevice?.resource?.name}
        ip={selectedDevice?.resource?.ip}
        refetchDevices={refetchDevices}
      />
      <DisplaySpecificaions resourcData={dynamicData} />
      <DisplayChart />
    </div>
  );
};
