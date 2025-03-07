import axios from "axios";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";
import { environment } from "../../config/environment";
import { useAppDispatch } from "../../hooks/redux";
import { formatTimestamp } from "../../lib/helpers/utils";
import { setActiveProject } from "../../redux/reducer/userSlice";
import { ProjectsType, Roles } from "../../types/generics.types";
import { RDropdownMenu } from "../shared/menus/dropdown-menu";
import { DotsDropdown } from "../shared/menus/simple-dropdown";
import { Table } from "../shared/table";

const token = localStorage.getItem("token");

export const menuItems = [
  { label: Roles.ADMINISTRATOR },
  { label: Roles.OWNER },
  { label: Roles.USER },
];

export const ListTeamMembers = ({
  currentProject,
}: {
  currentProject: ProjectsType | null;
}) => {
  if (!currentProject) return;
  // const { user } = useAppSelector(selectUser);

  const { createdBy } = currentProject;
  const dispatch = useAppDispatch();
  // const calculatedRole = (role: string) => {
  //   return user?._id === createdBy ? Roles.OWNER : role;
  // };
  const handleDeleteMember = async (email: string, isOwner: boolean) => {
    if (isOwner) return;
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

  const handleRoleChange = async (userId: string, newRole: string) => {
    const updatedUser = await updateUserRole(userId, newRole);
    if (updatedUser) {
      dispatch(
        setActiveProject({
          ...currentProject,
          teammates: currentProject.teammates?.map((member) =>
            member.user?._id === userId ? { ...member, role: newRole } : member
          ),
        })
      );
    }
  };

  const tableData = {
    headers: ["User", "Role", "Created", "Last Login", "Action"],
    body: currentProject?.teammates?.length
      ? currentProject?.teammates.map((member, index) => ({
          user: (
            <div className="flex gap-3 items-center">
              <img
                src={member.user?.avatar?.url}
                alt={member.user?.email}
                className="h-7 w-7 rounded-full"
              />
              <div className="py-1 text-xs text-gray-500">
                <div className="font-medium text-gray-600">
                  {member.user?.name}
                </div>
                <div>{member.user?.email}</div>
              </div>
            </div>
          ),
          role: (
            <RDropdownMenu
              items={menuItems}
              value={member.role}
              onChange={(e) => handleRoleChange(member.user?._id, e)}
              disabled={member.user?._id === createdBy}
            />
          ),
          created: formatTimestamp(member.user?.createdAt),
          lastlogin: formatTimestamp(member.user?.updatedAt),
          action: (
            <DotsDropdown
              items={[
                <div
                  className={`flex gap-3 items-center ${
                    member.user?._id === createdBy
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500"
                  } `}
                  key="remove"
                  onClick={() =>
                    handleDeleteMember(
                      member.user?.email,
                      member.user?._id === createdBy
                    )
                  }
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

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await axios.post(
        `${environment.VITE_API_URL}/user/update-role`,
        { userId, newRole },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("User role updated successfully");
        return response.data.user;
      }
    } catch (error: any) {
      console.error("Error updating user role:", error);
      toast.error(
        error.response?.data?.message || "Failed to update user role"
      );
      return null;
    }
  };

  return (
    <div className="flex w-full overflow-x-auto">
      <Table {...tableData} />
    </div>
  );
};
