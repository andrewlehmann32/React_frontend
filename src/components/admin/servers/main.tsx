import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { environment } from "../../../config/environment";
import { countryFlags } from "../../../constants/constants";
import axios from "../../../lib/apiConfig";
import { formatTimestamp } from "../../../lib/helpers/utils";
import { Device } from "../../../pages/resources";
import { ChartData } from "../../dashboard/trafficChart";
import { DisplayPageHeader } from "../../resources/display-page-header";
import {
  DisplayChart,
  DisplaySpecificaions,
} from "../../resources/display-specifications";

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
  const [trafficData, setTrafficData] = useState<ChartData[]>([]);
  const [trafficData95, setTrafficData95] = useState<ChartData[]>([]);
  const [trafficDataBytes, setTrafficDataBytes] = useState<ChartData[]>([]);
  const [disableServerActions, setDisableServerActions] =
    useState<boolean>(false);

  useEffect(() => {
    setDisableServerActions(selectedDevice?.resource?.reinstall || false);
  }, [selectedDevice]);

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
        value: formatTimestamp(selectedDevice?.createdAt ?? new Date()),
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
    billing: {
      billingType: selectedDevice?.resource?.price || "Hourly",
      value:
        selectedDevice?.resource?.price === "Hourly"
          ? selectedDevice?.planId?.price?.hourly ?? "N/A"
          : selectedDevice?.planId?.price?.monthly ?? "N/A",
    },
    traffic: trafficDataBytes,
  };

  useEffect(() => {
    if (selectedId !== null) {
      const device = devices.find(
        (device) => device.resource.resourceId === selectedId
      );
      if (device) setSelectedDevice(device);
    }
  }, [selectedId, devices, setSelectedDevice]);

  useEffect(() => {
    const fetchBandwidth = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering/${selectedDevice?.resource?.serverId}/bandwidth`
        );
        const bandwidthData = response?.data?.data?.result?.current_month;

        if (bandwidthData) {
          const BW_IN = parseFloat(bandwidthData.BW_IN_BYTES) || 0;
          const BW_OUT = parseFloat(bandwidthData.BW_OUT_BYTES) || 0;
          const BW_IN_95 = parseFloat(bandwidthData["95TH_PERC_IN"]) || 0;
          const BW_OUT_95 = parseFloat(bandwidthData["95TH_PERC_OUT"]) || 0;
          const BW_IN_BYTES =
            Math.round(
              ((parseFloat(bandwidthData.BW_IN_BYTES) || 0) / 1024 ** 3) * 100
            ) / 100;
          const BW_OUT_BYTES =
            Math.round(
              ((parseFloat(bandwidthData.BW_OUT_BYTES) || 0) / 1024 ** 3) * 100
            ) / 100;

          const formattedData: ChartData[] = [
            { name: "Inbound", value: BW_IN },
            { name: "Outbound", value: BW_OUT },
          ];
          const formattedData95: ChartData[] = [
            { name: "Inbound", value: BW_IN_95 },
            { name: "Outbound", value: BW_OUT_95 },
          ];
          const formattedDataBytes: ChartData[] = [
            { name: "Inbound", value: BW_IN_BYTES },
            { name: "Outbound", value: BW_OUT_BYTES },
          ];

          setTrafficData(formattedData);
          setTrafficData95(formattedData95);
          setTrafficDataBytes(formattedDataBytes);
        }
      } catch (error) {
        console.error("Error fetching bandwidth data:", error);
      }
    };

    fetchBandwidth();
  }, [selectedDevice, selectedDevice?.resource?.serverId]);

  if (!devices.length)
    return (
      <>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="min-w-36" count={0.2} height={30} />
            <Skeleton className="min-w-28" count={0.2} height={15} />
          </div>
          <Skeleton className="min-w-28" count={0.2} height={30} />
        </div>
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="col-span-1">
            <Skeleton className="h-72" />
          </div>
          <div className="col-span-2 flex flex-col gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <div className="col-span-1">
            <Skeleton className="h-72" />
          </div>
          <div className="col-span-2 flex flex-col gap-4">
            <Skeleton className="h-72" />
          </div>
        </div>
      </>
    );

  if (!selectedDevice) {
    return (
      <div className="w-full h-full justify-center items-center text-center flex">
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
        disableServerActions={disableServerActions}
        setDisableServerActions={setDisableServerActions}
      />
      <DisplaySpecificaions resourcData={dynamicData} />
      <DisplayChart chartData={trafficData} chartData95={trafficData95} />
    </div>
  );
};
