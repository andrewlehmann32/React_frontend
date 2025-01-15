import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { environment } from "../../config/environment";
import { Modal } from "../shared/popups/modal-box";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
const token = localStorage.getItem("token");

export interface AddTeamProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const AddTeam = ({ isModalOpen, setIsModalOpen }: AddTeamProps) => {
  const [teamInfo, setTeamInfo] = useState({
    name: "",
    icon: "",
    teamMates: [],
  });

  const handleInputChange = (field: string, value: string) => {
    setTeamInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTeamCreation = async () => {
    if (!teamInfo.name.length) return;
    try {
      const config = {
        url: `${environment.VITE_API_URL}/projects/ssh`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: teamInfo.name,
        },
      };
      const response = await axios(config);

      if (response.status === 201) {
        toast.success("SSH Key saved successfully");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error saving SSH Key:", error);
    }
  };
  return (
    <Modal
      triggerText=""
      title="Create New Team"
      onSave={handleTeamCreation}
      actionButtonText="Create Team"
      actionButtonStyles="w-full border"
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
    >
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2 ">
          <Label className="text-gray-500">Name</Label>
          <Input
            placeholder="Name"
            className="px-4"
            value={teamInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-gray-500">Icon URL</Label>
          <Input
            placeholder="Icon URL"
            className="px-4"
            value={teamInfo.icon}
            onChange={(e) => handleInputChange("icon", e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};
