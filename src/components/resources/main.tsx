import { useState } from "react";
import { DisplayPageHeader } from "./display-page-header";
import { DisplayChart, DisplaySpecificaions } from "./display-specifications";

export interface ResourcDataType {
  properties: { title: string; value: string }[];
  hardware: { title: string; value: string }[];
  credentials: { title: string; value: string }[];
}

const combinedData: ResourcDataType = {
  properties: [
    { title: "Host name", value: "c2-smalll-x68-chi-1" },
    { title: "Main IP", value: "91.242.214.195" },
    { title: "Created", value: "May 10th, 2023" },
    { title: "Location", value: "Chicago CHI" },
    { title: "Status", value: "On" },
    { title: "OS", value: "Ubuntu 24.04" },
    { title: "Tags", value: "Add tags..." },
  ],
  hardware: [
    { title: "CPU", value: "Xeon E-2286G CPU ..." },
    { title: "RAM", value: "32 GB" },
    { title: "Disk", value: "500 GB NVMe" },
    { title: "NIC", value: "2 X 1 Gbit/s" },
  ],
  credentials: [
    { title: "Username", value: "ubuntu" },
    { title: "Password", value: "phQoUUOd" },
    { title: "Login Snippet", value: "ssh ubuntu@91.242.214.195" },
  ],
};

export const Main = () => {
  const [resourcData, setResourceData] =
    useState<ResourcDataType>(combinedData);
  return (
    <div className="py-2 gap-2 flex flex-col pr-0 lg:pr-6 w-full ">
      <DisplayPageHeader setResourceData={setResourceData} />
      <DisplaySpecificaions resourcData={resourcData} />
      <DisplayChart />
    </div>
  );
};
