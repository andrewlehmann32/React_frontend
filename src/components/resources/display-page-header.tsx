import { useState } from "react";
import { CiPlay1, CiStop1 } from "react-icons/ci";
import { FaRegTrashAlt, FaTv } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoIosArrowDown, IoMdRefresh } from "react-icons/io";
import { svgDrawer } from "../../lib/helpers/svgDrawer";
import { RDropdownMenu } from "../shared/menus/dropdown-menu";
import { Modal } from "../shared/popups/modal-box";
import { Button } from "../ui/button";
import { ResourcDataType } from "./main";

// Define types for OS and Item
type OSItem = {
  icon: React.ReactNode;
  title: string;
  label: string;
};

type Item = {
  label: string;
  value: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const items: Item[] = [
  {
    value: "Start Server",
    icon: <CiPlay1 size={14} />,
    label: "Start Server",
  },
  {
    label: "Stop Server",
    value: "Stop Server",
    icon: <CiStop1 size={16} />,
  },
  {
    label: "Reboot Server",
    value: "Reboot Server",
    icon: <IoMdRefresh size={14} />,
  },
  {
    label: "Reinstall Server",
    value: "Reinstall Server",
    icon: <FiDownload size={14} />,
  },
  { label: "Novnc", value: "Novnc", icon: <FaTv size={14} /> },
  {
    label: "Destroy Server",
    value: "Destroy Server",
    icon: <FaRegTrashAlt size={14} />,
  },
];

const raid = [
  { title: "No RAID", subTitle: "" },
  { title: "RAID 0", subTitle: "Distributes data evenly" },
  { title: "RAID 1", subTitle: "Mirrors data across disks" },
];

const OS = [
  {
    icon: svgDrawer.centOS,
    title: "CentOS 24.04",
    label: "CentOS 24.04",
  },
  {
    icon: svgDrawer.rocky,
    title: "Rocky 24.04",
    label: "Rocky 24.04",
  },
  {
    icon: svgDrawer.ubuntu,
    title: "Ubuntu 24.04",
    label: "Ubuntu 24.04",
  },
  {
    icon: svgDrawer.debian,
    title: "Debian 24.04",
    label: "Debian 24.04",
  },
  {
    icon: svgDrawer.redHat,
    title: "Red Hat 24.04",
    label: "Red Hat 24.04",
  },
  {
    icon: svgDrawer.windows,
    title: "Windows 24.04",
    label: "Windows 24.04",
  },
];

type ModalDataType = {
  raid: { title: string; subTitle: string }[];
  OS: OSItem[];
};

const modalData: ModalDataType = {
  raid: raid,
  OS: OS,
};

type ModalPropsType = {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  modalData: ModalDataType;
};

const RenderModal = ({
  setIsModalOpen,
  isModalOpen,
  modalData,
}: ModalPropsType) => {
  const [raid, setRaid] = useState("");
  return (
    <Modal
      title="Reinstall Server"
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      onSave={() => {}}
      actionButtonText="Reinstall"
      actionButtonStyles="w-full border">
      <div className="w-full flex flex-col gap-4 ">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-2">
            Operating System
          </p>
          <RDropdownMenu items={modalData.OS} placeholder="OS" />
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium mb-2">SSH Keys</p>
          <div className="flex items-center justify-between gap-2 w-full text-gray-500 ">
            {/* <RDropdownMenu
              items={modalData.items}
              placeholder="Choose Keys"
            /> */}
            <div className="text-gray-500 text-sm w-1/2 text-center flex items-center justify-center gap-1 cursor-pointer active:scale-95">
              <div className="bg-blue-500 rounded-full px-1.5 text-center text-white">
                +
              </div>
              <p> Add New</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-1 gap-1">
          <p className="text-sm text-gray-500 mt-1">New Host Name</p>
          <input
            type="text"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ch01"
          />
        </div>

        <div className="flex flex-col gap-3 text-gray-500">
          <p className="font-medium text-sm text-gray-500">RAID</p>
          <div className="grid grid-cols-3 gap-3">
            {modalData.raid.map((item, index) => (
              <div
                className={`flex flex-col rounded-lg border py-2 px-3 lg:px-6 items-center justify-evenly text-sm cursor-pointer min-h-32 ${
                  raid === item.title
                    ? "border-blue-500"
                    : "border-gray-200 border"
                }`}
                key={index}
                onClick={() => setRaid(item.title)}>
                <div className="flex flex-col justify-center gap-1">
                  <div>{item.title}</div>
                  <p className="text-xs tracking-tighter">{item.subTitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col p-1 gap-1">
            <p className="text-xs text-gray-500 mt-1">
              Please type: c2-small-x86-chi-1 to confirm
            </p>
            <input
              type="text"
              className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type here"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

const RenderServerActions = ({
  setIsModalOpen,
}: // setResourceData,
{
  setIsModalOpen: (value: boolean) => void;
  setResourceData: (value: ResourcDataType) => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative">
      <Button onClick={() => setIsActive(!isActive)}>
        Server Actions <IoIosArrowDown />
      </Button>
      {isActive && (
        <div className="absolute bg-white border divide-y text-gray-500 text-xs top-10 right-0 rounded-md min-w-36">
          {items.map((item, index) => (
            <div
              className={`flex items-center py-2 gap-3 px-3 hover:bg-gray-100 cursor-pointer ${
                item.label === "Destroy Server" ? "text-red-500" : ""
              }`}
              key={index}
              onClick={() => {
                if (item.label === "Reinstall Server") {
                  setIsModalOpen(true);
                }
                // item?.onClick();
              }}>
              <span>{item.icon}</span>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const DisplayPageHeader = ({
  setResourceData,
}: {
  setResourceData: (value: ResourcDataType) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-start justify-between flex-wrap ">
      <div className="flex flex-col gap-1 text-xs text-gray-500">
        <h1 className="text-base font-semibold text-gray-800">Ubuntu_webdav</h1>
        <p>174.193.182.199</p>
      </div>
      <RenderServerActions
        setIsModalOpen={setIsModalOpen}
        setResourceData={setResourceData}
      />
      <RenderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalData={modalData}
      />
    </div>
  );
};
