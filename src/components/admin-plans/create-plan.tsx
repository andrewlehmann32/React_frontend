import { initialPlan } from "../../constants/constants";
import { PlanData } from "../../types/generics.types";
import { Modal } from "../shared/popups/modal-box";

interface CreatePlanProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  modalType: string;
  planData: PlanData;
  setPlanData: (value: PlanData) => void;
}

interface FormDataProps {
  planData: PlanData;
  handleChange: (name: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RenderForm = ({ planData, handleChange }: FormDataProps) => {
  return (
    <div className="flex flex-col p-1 gap-3">
      <div>
        <p className="text-sm text-gray-700 font-medium">Plan Name</p>
        <input
          type="text"
          className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type here"
          onChange={(e) => handleChange("name", e)}
          value={planData.name}
        />
      </div>
      <div className="flex gap-2">
        <div>
          <p className="text-sm text-gray-700 font-medium">CPU Name</p>
          <input
            type="text"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("cpu.name", e)}
            value={planData.cpu.name}
          />
        </div>
        <div>
          <p className="text-sm text-gray-700 font-medium">CPU Cores</p>
          <input
            type="number"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("cpu.cores", e)}
            value={planData.cpu.cores}
          />
        </div>
        <div>
          <p className="text-sm text-gray-700 font-medium">CPU Speed</p>
          <input
            type="text"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("cpu.speed", e)}
            value={planData.cpu.speed}
          />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-700 font-medium">RAM</p>
        <span className="flex items-end gap-1">
          <input
            type="number"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("ram", e)}
            value={planData.ram}
          />
          <span className="text-sm text-gray-700 font-medium flex"> GB</span>
        </span>
      </div>
      <div>
        <p className="text-sm text-gray-700 font-medium">Storage</p>
        <span className="flex items-end gap-1">
          <input
            type="text"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("storage", e)}
            value={planData.storage}
          />
          <span className="text-sm text-gray-700 font-medium flex"> GB</span>
        </span>
      </div>
      <div className="flex gap-2">
        <div>
          <p className="text-sm text-gray-700 font-medium">Network Total</p>
          <input
            type="number"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("network.total", e)}
            value={planData.network.total}
          />
        </div>
        <div>
          <p className="text-sm text-gray-700 font-medium">Network Speed</p>
          <span className="flex items-end gap-1">
            <input
              type="text"
              className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type here"
              onChange={(e) => handleChange("network.speed", e)}
              value={planData.network.speed}
            />
            <span className="text-sm text-gray-700 font-medium">/sec</span>
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <p className="text-sm text-gray-700 font-medium">Monthly Price</p>
          <span className="flex items-end gap-1">
            <input
              type="number"
              className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type here"
              onChange={(e) => handleChange("price.monthly", e)}
              value={planData.price.monthly}
            />
            <span className="text-sm text-gray-700 font-medium">$/mo</span>
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-700 font-medium">Hourly Price</p>
          <span className="flex items-end gap-1">
            <input
              type="number"
              className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type here"
              onChange={(e) => handleChange("price.hourly", e)}
              value={planData.price.hourly}
            />
            <span className="text-sm text-gray-700 font-medium">$/hr</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export const PlanModal = ({
  isModalOpen,
  setIsModalOpen,
  modalType,
  planData,
  setPlanData,
}: CreatePlanProps) => {
  const handleInputChange = (
    path: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === "number" ? +e.target.value : e.target.value;

    setPlanData((prev: PlanData) => {
      const parts = path.split(".");

      if (parts.length === 1) {
        return { ...prev, [path]: value };
      }

      // Handle two-level nesting (like "cpu.name")
      const [object, key] = parts;

      return {
        ...prev,
        [object]: {
          ...(prev[object as keyof PlanData] as object), // Ensure proper typing for nested object
          [key]: value,
        },
      };
    });
  };

  const handleSave = () => {
    if (modalType === "edit") {
      console.log("Updated Plan Data:", planData);
    } else {
      console.log("New Plan Data:", planData);
    }
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={`${modalType} Plan`}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      onSave={handleSave}
      actionButtonText={modalType === "Create" ? "Create Plan" : "Update Plan"}
      actionButtonStyles="w-full border text-white bg-gray-800 hover:text-gray-800"
    >
      <RenderForm
        planData={modalType === "create" ? initialPlan : planData}
        handleChange={handleInputChange}
      />
    </Modal>
  );
};
