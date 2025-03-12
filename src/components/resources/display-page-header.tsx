import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CiPlay1, CiStop1 } from "react-icons/ci";
import { FaRegTrashAlt, FaTv } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoIosArrowDown, IoMdRefresh } from "react-icons/io";
import { environment } from "../../config/environment";
import { OS, raid } from "../../constants/constants";
import axios from "../../lib/apiConfig";
import { RDropdownMenu } from "../shared/menus/dropdown-menu";
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
  isModalOpen: boolean;
  modalData: ModalDataType;
};

type DeleteModalPropsType = {
  id: number;
  name: string;
  setIsDeleteModalOpen: (value: boolean) => void;
  isDeleteModalOpen: boolean;
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
      actionButtonText={
        <>
          <FiDownload size={14} />
          Reinstall Server
        </>
      }
      actionButtonStyles="w-full border"
    >
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

const RenderDeleteModal = ({
  id,
  name,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
}: DeleteModalPropsType) => {
  const [inputValue, setInputValue] = useState("");
  const isDisabled = inputValue !== name;
  const token = localStorage.getItem("token");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDelete = async () => {
    try {
      if (!token) {
        toast.error("Authorization token is missing");
        return;
      }

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
  id,
  setIsModalOpen,
  setIsDeleteModalOpen,
}: {
  id: number;
  setIsModalOpen: (value: boolean) => void;
  setIsDeleteModalOpen: (value: boolean) => void;
}) => {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleApiCall = async (value: string) => {
    try {
      let apiUrl;
      let successMessage;
      if (value === "Start") {
        apiUrl = `${environment.VITE_API_URL}/ordering/${id}/boot`;
        successMessage = "Server started successfully";
      } else if (value === "Stop") {
        apiUrl = `${environment.VITE_API_URL}/ordering/${id}/shutdown`;
        successMessage = "Server stopped successfully";
      } else {
        apiUrl = `${environment.VITE_API_URL}/ordering/${id}/reboot`;
        successMessage = "Server rebooted successfully";
      }

      const config = {
        url: apiUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        toast.success(successMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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
      onClick: () => {},
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
              onClick={() => handleSelection(item)}
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

export const DisplayPageHeader = ({ name, ip, id }: DisplayPageHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex items-start justify-between flex-wrap ">
      <div className="flex flex-col gap-1 text-xs text-gray-500">
        <h1 className="text-base font-semibold text-gray-800">{name}</h1>
        <p>{ip}</p>
      </div>
      <RenderServerActions
        id={id}
        setIsModalOpen={setIsModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <RenderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalData={modalData}
      />
      <RenderDeleteModal
        id={id}
        name={name}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </div>
  );
};
