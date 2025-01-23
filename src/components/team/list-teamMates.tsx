import axios from "axios";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";
import { environment } from "../../config/environment";
import { useAppDispatch } from "../../hooks/redux";
import { formatTimestamp } from "../../lib/helpers/utils";
import { setActiveProject } from "../../redux/reducer/userSlice";
import { ProjectsType } from "../../types/generics.types";
import { RDropdownMenu } from "../shared/menus/dropdown-menu";
import { DotsDropdown } from "../shared/menus/simple-dropdown";
import { Table } from "../shared/table";

const token = localStorage.getItem("token");

const menuItems = [
  { label: "Administrator" },
  { label: "Owner" },
  { label: "User" },
];

export const ListTeamMembers = ({
  currentProject,
}: {
  currentProject: ProjectsType | null;
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteMember = async (email: string) => {
    try {
      const config = {
        url: `${environment.VITE_API_URL}/members/remove-teammate`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          email,
          projectId: currentProject?._id,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setActiveProject(response.data.project));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove team member");
    }
  };

  const tableData = {
    headers: ["User", "Role", "Created", "Last", "Action"],
    body: currentProject?.teammates?.length
      ? currentProject?.teammates.map((member, index) => ({
          user: (
            <div className="flex gap-3 items-center">
              <img
                src={member.avatar?.url}
                alt={member.email}
                className="h-7 w-7 rounded-full"
              />
              <div className="py-1 text-xs text-gray-500">
                <div className="font-medium text-gray-600">{member.name}</div>
                <div>{member.email}</div>
              </div>
            </div>
          ),
          role: <RDropdownMenu items={menuItems} defaultValue={member.role} />,
          created: formatTimestamp(member.createdAt),
          last: formatTimestamp(member.updatedAt),
          action: (
            <DotsDropdown
              items={[
                <div
                  className="flex gap-3 items-center text-red-500"
                  key="remove"
                  onClick={() => handleDeleteMember(member.email)}
                >
                  <FaRegTrashCan />
                  <span>Remove User</span>
                </div>,
              ]}
              id={index.toString()}
              isSidebarCollapsed={false}
            />
          ),
        }))
      : [],
  };

  return (
    <div className="flex w-full overflow-x-auto">
      <Table {...tableData} />
    </div>
  );
};
