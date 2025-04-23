import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CiPlay1, CiStop1 } from "react-icons/ci";
import { FaRegTrashAlt, FaTv } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoIosArrowDown, IoMdRefresh } from "react-icons/io";
import { environment } from "../../config/environment";
import { OS, raid } from "../../constants/constants";
import { useAppSelector } from "../../hooks/redux";
import axios from "../../lib/apiConfig";
import { selectActiveProject } from "../../redux/selectors/userSelector";
import { SSHItem } from "../ordering/detailsPage";
import { RDropdownMenu } from "../shared/menus/dropdown-menu";
import { OrderDropdownMenu } from "../shared/menus/ordering-dropdown";
import { Modal } from "../shared/popups/modal-box";
import { Button } from "../ui/button";

// Define types for OS and Item
type OSItem = {
  id?: number;
  icon: React.ReactNode;
  title: string;
  label: string;
};

type Item = {
  label: string;
  value: string;
  icon: React.ReactNode;
  onClick: () => void;
};

interface DisplayPageHeaderProps {
  name: string;
  ip: string;
  id: number;
  serverId: number;
  refetchDevices: () => void;
  setDisableServerActions: (value: boolean) => void;
  disableServerActions: boolean;
}

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
  serverId: number;
  name: string;
  isModalOpen: boolean;
  modalData: ModalDataType;
  refetchDevices: () => void;
  setDisableServerActions: (value: boolean) => void;
};

type DeleteModalPropsType = {
  id: number;
  name: string;
  setIsDeleteModalOpen: (value: boolean) => void;
  isDeleteModalOpen: boolean;
  refetchDevices: () => void;
};

const RenderModal = ({
  setIsModalOpen,
  isModalOpen,
  modalData,
  refetchDevices,
  serverId,
  name,
  setDisableServerActions,
}: ModalPropsType) => {
  const [raid, setRaid] = useState("");
  const [sshItems, setSshItems] = useState<SSHItem[]>([]);
  const [sshKey, setSshKey] = useState<SSHItem>();
  const [os, setOs] = useState<{ label: string; id: number; title: string }[]>(
    []
  );
  const [selectedOs, setSelectedOs] = useState<{ label: string; id: number }>();
  const [hostname, setHostname] = useState("");
  const [confirmationInput, setConfirmationInput] = useState("");
  const currentProject = useAppSelector(selectActiveProject);

  useEffect(() => {
    if (currentProject?.sshKeys) {
      const sshData = currentProject.sshKeys.map((item) => ({
        label: item.name,
        key: item.key,
      }));

      setSshItems(sshData);
    }
  }, [currentProject]);

  const isDisabled = confirmationInput !== name;

  useEffect(() => {
    const fetchOS = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering/os`
        );
        const fetchedOS = response?.data?.data;

        const formattedOS = fetchedOS.map(
          (item: { name: string; id: number }) => ({
            label: item.name,
            title: item.name,
            id: item.id,
          })
        );
        setOs(formattedOS);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOS();
  }, []);

  const handleReInstall = async () => {
    const payLoad = {
      template: selectedOs?.id,
      ssh: sshKey?.key,
      hostname: hostname,
      projectName: currentProject?.name,
    };

    try {
      const apiUrl = `${environment.VITE_API_URL}/ordering/${serverId}/reinstall`;

      const config = {
        url: apiUrl,
        method: "POST",
        data: payLoad,
      };

      const response = await axios(config);

      if (response.status === 200) {
        if (response?.data?.data?.success === false) {
          toast.error(response?.data?.data?.message);
        } else {
          toast.success(response?.data?.message);
        }
        setSelectedOs({ label: "", id: 0 });
        setSshKey({ label: "", key: "" });
        setHostname("");
        setConfirmationInput("");
        setRaid("");
        setIsModalOpen(false);
        setDisableServerActions(true);
        refetchDevices();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleInputChange = (label: string) => {
    const filteredSsh = sshItems
      .map((item) => ({ name: item.label, key: item.key }))
      .find((item) => item.name === label);
    if (filteredSsh)
      setSshKey({ label: filteredSsh.name, key: filteredSsh.key });
  };

  return (
    <Modal
      title="Reinstall Server"
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      onSave={handleReInstall}
      actionButtonText={
        <>
          <FiDownload size={14} />
          Reinstall Server
        </>
      }
      actionButtonStyles="w-full border"
      disabled={isDisabled}
    >
      <div className="w-full flex flex-col gap-4 ">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-2">
            Operating System
          </p>
          <OrderDropdownMenu
            items={os}
            placeholder="OS"
            onChange={(item) =>
              setSelectedOs({ label: item.label ?? "", id: item.id })
            }
            value={selectedOs?.label}
          />
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium mb-2">SSH Keys</p>
          <div className="flex items-center justify-between gap-2 w-full text-gray-500 ">
            <RDropdownMenu
              items={sshItems}
              placeholder="SSH"
              onChange={(value) => handleInputChange(value)}
            />
          </div>
        </div>

        <div className="flex flex-col p-1 gap-1">
          <p className="text-sm text-gray-500 mt-1">New Host Name</p>
          <input
            type="text"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ch01"
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
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
                onClick={() => setRaid(item.title)}
              >
                <div className="flex flex-col justify-center gap-1">
                  <div>{item.title}</div>
                  <p className="text-xs tracking-tighter">{item.subTitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col p-1 gap-1">
            <p className="text-xs text-gray-500 mt-1">
              Please type: {name} to confirm
            </p>
            <input
              type="text"
              className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type here"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

const RenderDeleteModal = ({
  id,
  name,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
  refetchDevices,
}: DeleteModalPropsType) => {
  const [inputValue, setInputValue] = useState("");
  const isDisabled = inputValue !== name;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDelete = async () => {
    try {
      const apiUrl = `${environment.VITE_API_URL}/ordering/${id}`;
      const successMessage = "Server Deleted successfully";

      const config = {
        url: apiUrl,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        toast.success(successMessage);
        // dispatch(setActiveProject(response.data.project));
        refetchDevices();
      }
      setIsDeleteModalOpen(false);
    } catch (error) {
      setIsDeleteModalOpen(false);
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Modal
      title="Destroy Server"
      isOpen={isDeleteModalOpen}
      setIsOpen={setIsDeleteModalOpen}
      disabled={isDisabled}
      onSave={handleDelete}
      actionButtonText={
        <>
          <FaRegTrashAlt size={16} />
          Destroy Server
        </>
      }
      actionButtonStyles="w-full border text-red-500"
    >
      <div className="flex flex-col p-1 gap-1">
        <p className="text-xs text-gray-500 my-1">
          Please type: {name} to confirm
        </p>
        <input
          type="text"
          className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type here"
          onChange={handleInputChange}
        />
      </div>
    </Modal>
  );
};

const RenderServerActions = ({
  serverId,
  resourceId,
  setIsModalOpen,
  setIsDeleteModalOpen,
  refetchDevices,
  disableServerActions,
}: {
  serverId: number;
  resourceId: number;
  setIsModalOpen: (value: boolean) => void;
  setIsDeleteModalOpen: (value: boolean) => void;
  refetchDevices: () => void;
  disableServerActions: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleApiCall = async (value: string) => {
    try {
      setLoading(true);
      let apiUrl;
      let reFetch = false;
      let successMessage;
      let method = "POST";

      if (value === "Start") {
        apiUrl = `${environment.VITE_API_URL}/ordering/${serverId}/boot`;
        successMessage = "Server started successfully";
        reFetch = true;
      } else if (value === "Stop") {
        apiUrl = `${environment.VITE_API_URL}/ordering/${serverId}/shutdown`;
        successMessage = "Server stopped successfully";
        reFetch = true;
      } else if (value === "Novnc") {
        apiUrl = `${environment.VITE_API_URL}/ordering/${serverId}/novnc`;
        successMessage = "NoVNC Successful";
        method = "GET";
      } else {
        apiUrl = `${environment.VITE_API_URL}/ordering/${serverId}/reboot`;
        successMessage = "Server rebooted successfully";
        reFetch = true;
      }

      const config = {
        url: apiUrl,
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          resourceId: resourceId,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        if (value === "Novnc") {
          const url = response?.data?.data?.result?.url;
          if (url.length) {
            window.open(url, "_blank");
          }
        } else {
          toast.success(successMessage);
          if (reFetch) refetchDevices();
        }
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        axios.isAxiosError(error) && error.response && value === "Novnc"
          ? error.response.data.message
          : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const items: Item[] = [
    {
      value: "Start Server",
      icon: <CiPlay1 size={14} />,
      label: "Start Server",
      onClick: () => handleApiCall("Start"),
    },
    {
      label: "Stop Server",
      value: "Stop Server",
      icon: <CiStop1 size={16} />,
      onClick: () => handleApiCall("Stop"),
    },
    {
      label: "Reboot Server",
      value: "Reboot Server",
      icon: <IoMdRefresh size={14} />,
      onClick: () => handleApiCall("Reboot"),
    },
    {
      label: "Reinstall Server",
      value: "Reinstall Server",
      icon: <FiDownload size={14} />,
      onClick: () => {},
    },
    {
      label: "Novnc",
      value: "Novnc",
      icon: <FaTv size={14} />,
      onClick: () => handleApiCall("Novnc"),
    },
    {
      label: "Destroy Server",
      value: "Destroy Server",
      icon: <FaRegTrashAlt size={14} />,
      onClick: () => {},
    },
  ];

  const handleSelection = (item: Item) => {
    const { label, onClick } = item;

    if (label === "Reinstall Server") {
      setIsModalOpen(true);
    } else if (label === "Destroy Server") {
      setIsDeleteModalOpen(true);
    } else {
      onClick();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    if (!isActive) {
      document.removeEventListener("click", handleClickOutside);
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsActive(!isActive)}
        disabled={disableServerActions}
      >
        Server Actions <IoIosArrowDown />
      </Button>
      {isActive && (
        <div className="absolute bg-white border divide-y text-gray-500 text-xs top-10 right-0 rounded-md min-w-36">
          {items.map((item, index) => (
            <div
              className={`flex items-center py-2 gap-3 px-3 hover:bg-gray-100 cursor-pointer ${
                item.label === "Destroy Server" ? "text-red-500" : ""
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              key={index}
              onClick={() => !loading && handleSelection(item)}
            >
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
  name,
  ip,
  id,
  serverId,
  refetchDevices,
  disableServerActions,
  setDisableServerActions,
}: DisplayPageHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex items-start justify-between flex-wrap ">
      <div className="flex flex-col gap-1 text-xs text-gray-500">
        <h1 className="text-base font-semibold text-gray-800">{name}</h1>
        <p>{ip}</p>
      </div>
      <RenderServerActions
        resourceId={id}
        serverId={serverId}
        setIsModalOpen={setIsModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        refetchDevices={refetchDevices}
        disableServerActions={disableServerActions}
      />
      <RenderModal
        isModalOpen={isModalOpen}
        serverId={serverId}
        name={name}
        setIsModalOpen={setIsModalOpen}
        modalData={modalData}
        refetchDevices={refetchDevices}
        setDisableServerActions={setDisableServerActions}
      />
      <RenderDeleteModal
        id={id}
        name={name}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        refetchDevices={refetchDevices}
      />
    </div>
  );
};
