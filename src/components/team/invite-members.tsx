import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineArrowOutward } from "react-icons/md";
import { environment } from "../../config/environment";
import { useAppSelector } from "../../hooks/redux";
import axios from "../../lib/apiConfig";
import { handleAxiosError } from "../../lib/helpers/utils";
import { selectActiveProject } from "../../redux/selectors/userSelector";
import { Modal } from "../shared/popups/modal-box";
import { Input } from "../ui/input";

type InviteMembersProps = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
};

export const InviteMembers = ({
  isActive,
  setIsActive,
}: InviteMembersProps) => {
  if (!isActive) return null;
  const [searchValue, setSearchValue] = useState("");
  const activeProject = useAppSelector(selectActiveProject);

  const sendInvite = async (email: string) => {
    try {
      const config = {
        url: `${environment.VITE_API_URL}/members/sendInvite`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          projectId: activeProject?._id,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        setIsActive(false);
        toast.success("Invitation sent successfully");
      }
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendInvite(searchValue);
    }
  };

  return (
    <Modal
      title=""
      actionButtonText=""
      actionButtonStyles="w-full border"
      isOpen={isActive}
      setIsOpen={setIsActive}
      button={false}
    >
      <div className="w-full flex flex-col gap-6 px-3">
        <div className="flex flex-col gap-2">
          <div className="flex  items-center text-gray-500">
            <p className="text-gray-700 text-sm font-medium">
              Invite Team Member
            </p>
          </div>
          <div className="relative">
            <Input
              placeholder="Search with email"
              className="p-4 pr-16 rounded-lg"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              type="email"
            />
            <button
              className="rounded-md bg-black text-white px-3 py-2 cursor-pointer active:scale-90 absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => sendInvite(searchValue)}
              disabled={!activeProject}
            >
              <MdOutlineArrowOutward />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
