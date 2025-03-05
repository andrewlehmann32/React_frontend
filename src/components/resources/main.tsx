import { useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Device } from "../../pages/resources";
import { selectActiveProject } from "../../redux/selectors/userSelector";
import { DisplayPageHeader } from "./display-page-header";
import { DisplayChart, DisplaySpecificaions } from "./display-specifications";

export interface ResourcDataType {
  properties: { title: string; value: string }[];
  hardware: { title: string; value: string }[];
  credentials: { title: string; value: string }[];
}

export const Main = ({
  devices,
  selectedId,
  selectedDevice,
  setSelectedDevice,
}: {
  devices: Device[];
  selectedId: number | null;
  selectedDevice: Device | undefined;
  setSelectedDevice: (device: Device) => void;
}) => {
  const currentProject = useAppSelector(selectActiveProject);

  if (!currentProject) return;

  const dynamicData = {
    properties: [
      {
        title: "Host name",
        value: selectedDevice?.resource.hostname || "Unknown",
      },
      { title: "Main IP", value: selectedDevice?.resource?.ip || "Unknown" },
      { title: "Created", value: "May 10th, 2023" },
      { title: "Location", value: "Chicago CHI" },
      { title: "Status", value: selectedDevice?.resource?.status || "Unknown" },
      { title: "OS", value: selectedDevice?.resource?.os || "Unknown" },
      { title: "Tags", value: "Add tags..." },
    ],
    hardware: [
      { title: "CPU", value: "Xeon E-2286G CPU ..." },
      { title: "RAM", value: "32 GB" },
      { title: "Disk", value: "500 GB NVMe" },
      { title: "NIC", value: "2 X 1 Gbit/s" },
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
  };

  useEffect(() => {
    if (selectedId !== null) {
      const device = devices.find(
        (device) => device.resource.resourceId === selectedId
      );
      if (device) setSelectedDevice(device);
    }
  }, [selectedId, devices]);

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
        name={selectedDevice?.resource?.name}
        ip={selectedDevice?.resource?.ip}
      />
      <DisplaySpecificaions resourcData={dynamicData} />
      <DisplayChart />
    </div>
  );
};
