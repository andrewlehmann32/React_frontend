import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { environment } from "../../config/environment";
import { useAppDispatch } from "../../hooks/redux";
import { setUserProjects } from "../../redux/reducer/userSlice";
import { Modal } from "../shared/popups/modal-box";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
const token = localStorage.getItem("token");

export interface AddTeamProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const AddTeam = ({ isModalOpen, setIsModalOpen }: AddTeamProps) => {
  const dispatch = useAppDispatch();
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

  const fetchAndDispatchProjects = async () => {
    try {
      const response = await axios.get(`${environment.VITE_API_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data?.projects);
        toast.success("Projects fetched successfully");
        dispatch(setUserProjects(response.data?.projects));
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
    }
  };

  const handleTeamCreation = async () => {
    if (!teamInfo.name.length) {
      toast.error("Please provide a name for the team");
      return;
    }
    try {
      const config = {
        url: `${environment.VITE_API_URL}/projects`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: teamInfo.name,
          icon: teamInfo.icon,
        },
      };
      const response = await axios(config);

      if (response.status === 201) {
        toast.success("New Team Created successfully");
        setIsModalOpen(false);
        fetchAndDispatchProjects();
      }
    } catch (error) {
      console.error("Error creating new team:", error);
      toast.error("Failed to create team");
    }
  };

  return (
    <Modal
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
