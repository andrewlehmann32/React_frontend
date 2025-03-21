import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiCalendar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { OSOrdering } from "../../constants/constants";
import { Chart } from "../generics/chart";
import { ToggleButton } from "../shared/buttons/buttons";
import { ResourcDataType } from "./main";

export const DisplayChart = () => {
  const [selected, setSelected] = useState("Total Transfer");
  const items = ["Total Transfer", "95th Percentile"];
  const selectedStyles = "bg-white  hover:bg-white";

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 text-gray-500 text-xs">
        <div className="flex flex-col gap-1 text-gray-800">
          <h1 className="text-sm">Aggregate Traffic</h1>
          <p>
            1.27 GB / <span className="text-gray-500">8 GB</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3  w-full sm:w-fit">
          <div className="px-2 py-1 bg-gray-100 rounded-md flex justify-end">
            <div className="flex gap-1">
              {items.map((item, index) => (
                <div
                  className={`${
                    selected === item ? selectedStyles : ""
                  } w-[6.5rem] text-center py-1 px-2 cursor-pointer  hover:bg-gray-200 text-xs rounded-md flex items-center justify-center`}
                  key={index}
                  onClick={() => setSelected(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <div className="flex items-center bg-gray-100 py-1 gap-2 px-4 rounded-md justify-end">
              Current Billing Cycle <IoIosArrowDown />
            </div>
            <div className="bg-gray-100 p-2 rounded-md">
              <CiCalendar className="text-xl" />
            </div>
          </div>
        </div>
      </div>
      <Chart />
    </div>
  );
};

export const DisplaySpecificaions = ({
  resourcData,
}: {
  resourcData: ResourcDataType;
}) => {
  console.log("rs data", resourcData);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 py-2">
      <div className="rounded-md p-4 bg-gray-100 order-1 md:order-none">
        <h1 className="font-medium pb-2">Properties</h1>
        <div className="flex flex-col gap-3 text-xs">
          {resourcData.properties.map((property, index) => (
            <div
              className="flex justify-between items-center text-gray-500"
              key={index}
            >
              <p className="w-2/5">{property.title}</p>
              <div className="w-3/5 flex items-center gap-2">
                {property.title === "Host name" && (
                  <p className="text-foreground">{property.value}</p>
                )}
                {property.title === "Main IP" && (
                  <div className="flex items-center gap-2">
                    <IoCopyOutline
                      size={16}
                      className="cursor-pointer hover:text-gray-700"
                      onClick={() => copyToClipboard(property.value)}
                    />
                    <p className="text-foreground">{property.value}</p>
                  </div>
                )}
                {property.title === "Location" && (
                  <div className="flex items-center gap-2">
                    <div className="w6 h-6">
                      {property.icon && React.isValidElement(property.icon)
                        ? React.cloneElement(
                            property.icon as React.ReactElement,
                            {
                              width: "100%",
                              height: "100%",
                            }
                          )
                        : null}
                    </div>
                    <p>{property.value}</p>
                  </div>
                )}
                {property.title === "OS" && (
                  <div className="flex items-center gap-2">
                    <div className="w6 h-6">
                      {OSOrdering.map((os) =>
                        os.title === property.value.split(" ")[0] &&
                        React.isValidElement(os.icon)
                          ? React.cloneElement(os.icon as React.ReactElement, {
                              width: "100%",
                              height: "100%",
                            })
                          : null
                      )}
                    </div>
                    <p>{property.value}</p>
                  </div>
                )}
                {property.title === "Status" && (
                  <div className="flex items-center gap-2">
                    <ToggleButton
                      showLabel={true}
                      disabled={true}
                      isChecked={
                        property.value === "running" ||
                        property.value === "accepted"
                      }
                    />
                  </div>
                )}
                {property.title !== "Main IP" &&
                  property.title !== "Location" &&
                  property.title !== "OS" &&
                  property.title !== "Host name" &&
                  property.title !== "Status" && <p>{property.value}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 text-xs order-3 md:order-none xl:col-span-2">
        <div className="border rounded-md p-2 divide-y">
          <div className="flex flex-wrap items-center gap-2 p-1 pb-2">
            <h1 className="font-medium text-sm">Billing Information</h1>
            <p className="text-gray-500">View billing information here</p>
          </div>
          <div className="flex justify-between items-center py-5 pb-4">
            <p className="text-gray-500">Hourly Price</p>
            <p>{`$ ${resourcData.billing}`}</p>
          </div>
        </div>
        <div className="border  rounded-md p-2 divide-y">
          <div className="flex flex-wrap items-center gap-2 p-1 pb-2">
            <h1 className="font-medium text-sm">Credentials</h1>
            <p className="text-gray-500">
              View credentials to your server here
            </p>
          </div>
          <div className="flex justify-between items-center py-5 pb-4">
            <div className="flex flex-col gap-3 text-xs w-full">
              {resourcData.credentials.map((credential, index) => (
                <div className="flex justify-between items-center" key={index}>
                  <p className="text-gray-500">{credential.title}</p>
                  <div className="flex items-center gap-2">
                    <IoCopyOutline
                      size={16}
                      className="cursor-pointer hover:text-gray-700"
                      onClick={() => copyToClipboard(credential.value)}
                    />
                    <p>{credential.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md p-4 bg-gray-100 order-2 md:order-none">
        <h1 className="font-medium pb-2">Hardware</h1>
        <div className="flex flex-col gap-3 text-xs">
          {resourcData.hardware.map((hardwares, index) => (
            <div
              className="flex justify-between items-center text-gray-500"
              key={index}
            >
              <p className="w-2/5 ">{hardwares.title}</p>
              <p className="w-3/5  ">{hardwares.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-xs order-4 md:order-none xl:col-span-2">
        <div className="pb-3">
          <h1 className="font-medium py-1">Bandwidth Information</h1>
          <p className="text-gray-500">View your bandwidth information here</p>
        </div>
        <div className="flex flex-col border rounded-md p-3 gap-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">Inbound</p>
            <p>0 TB</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500">Outbound</p>
            <p>0 TB</p>
          </div>
        </div>
      </div>
    </div>
  );
};
