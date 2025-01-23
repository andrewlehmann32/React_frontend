import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { environment } from "../../config/environment";
import { useAppSelector } from "../../hooks/redux";
import { useDebounce } from "../../hooks/use-debounce";
import { selectActiveProject } from "../../redux/selectors/userSelector";
import { User } from "../../types/generics.types";
import { Modal } from "../shared/popups/modal-box";
import { Input } from "../ui/input";
import { ListUsers } from "./list-users";

const token = localStorage.getItem("token");

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
  const [users, setUsers] = useState<User[]>([]);
  const activeProject = useAppSelector(selectActiveProject);

  const debouncedSearchValue = useDebounce(searchValue, 100);

  const fetchUsers = async () => {
    try {
      const config = {
        url: `${environment.VITE_API_URL}/members/search-member`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          email: debouncedSearchValue.trim(),
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        setUsers(response.data.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (debouncedSearchValue || searchValue === "") {
      fetchUsers();
    }
  }, [debouncedSearchValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchUsers();
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
              People with access
            </p>
          </div>
          <div className="relative">
            <Input
              placeholder="Search with email"
              className="p-4 pr-16 rounded-lg"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <span
              className="rounded-md bg-black text-white px-3 py-2 cursor-pointer active:scale-90 absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => fetchUsers()}
            >
              <MdOutlineArrowOutward />
            </span>
          </div>
        </div>
        {activeProject && (
          <ListUsers
            users={users}
            projectId={activeProject._id}
            setModal={setIsActive}
          />
        )}
      </div>
    </Modal>
  );
};
