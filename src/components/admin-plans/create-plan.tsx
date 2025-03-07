import axios from "axios";
import toast from "react-hot-toast";
import { environment } from "../../config/environment";
import { initialPlan } from "../../constants/constants";
import { PlanData } from "../../types/generics.types";
import { Modal } from "../shared/popups/modal-box";
import { RenderForm } from "./modal-form";

interface CreatePlanProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  modalType: string;
  planData: any;
  setPlanData: (value: any) => any;
}

const token = localStorage.getItem("token");
const availableRegions = [
  { name: "New York", keyword: "NY" },
  { name: "Los Angeles", keyword: "LA" },
  { name: "London", keyword: "LDN" },
  { name: "Tokyo", keyword: "TOK" },
];

export const PlanModal = ({
  isModalOpen,
  setIsModalOpen,
  modalType,
  planData,
  setPlanData,
}: CreatePlanProps) => {
  const handleRegionChange = (selectedRegions: any) => {
    const newRegions = selectedRegions.map((region: any) => ({
      name: region.label,
      keyword: region.value,
      quantity: 0,
    }));

    setPlanData((prev: any): any => ({
      ...prev,
      regions: newRegions.length > 0 ? newRegions : [...prev.regions],
    }));
  };

  const handleQuantityChange = (
    regionName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);

    setPlanData((prev: PlanData): any => ({
      ...prev,
      regions: prev.regions.map((region) =>
        region.name === regionName ? { ...region, quantity: value } : region
      ),
    }));
  };

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

  const saveEditedPlan = async (planId: string) => {
    try {
      const response = await axios.put(
        `${environment.VITE_API_URL}/plans/${planId}`,
        { ...planData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating plan status:", error);
    }
  };

  const handleSave = async () => {
    if (modalType === "Edit") return await saveEditedPlan(planData?._id);
    try {
      const config = {
        url: `${environment.VITE_API_URL}/plans`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: planData,
      };
      const response = await axios(config);
      toast.success(response.data.message);
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error fetching projects:", error);
      toast.error(error.response?.data?.message);
    }
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
        handleRegionChange={handleRegionChange}
        handleQuantityChange={handleQuantityChange}
        availableRegions={availableRegions}
      />
    </Modal>
  );
};
