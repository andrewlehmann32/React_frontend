import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSupport } from "react-icons/bi";
import { PiCaretDoubleLeftBold } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DROPDOWN_DIRECTION,
  menuItems,
  miscItems,
} from "../constants/constants";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { calculateDaysFromDate, mergeClasses } from "../lib/helpers/utils";
import { useLogoutMutation } from "../redux/api/user-api";
import { logout, setActiveProject } from "../redux/reducer/userSlice";
import {
  selectActiveProject,
  selectUser,
  selectUserProjects,
} from "../redux/selectors/userSelector";
import { ProjectsType } from "../types/generics.types";
import { AddTeam } from "./generics/add-team";
import { DotsDropdown } from "./shared/menus/simple-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type SidebarHeaderProps = {
  userProjects: any;
  activeProject: ProjectsType;
  isSidebarCollapsed: boolean;
};

const SidebarHead = ({
  userProjects,
  activeProject,
  isSidebarCollapsed,
}: SidebarHeaderProps) => {
  const dispatch = useAppDispatch();
  const [isWorkspaceActive, setIsWorkspaceActive] = useState(!!activeProject);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState({
    icon: activeProject?.icon ?? userProjects[0]?.icon,
    name: activeProject?.name ?? userProjects[0]?.name,
    createdAt: `Created ${calculateDaysFromDate(
      activeProject?.createdAt ?? userProjects[0]?.createdAt
    )} days ago`,
  });

  useEffect(() => {
    if (!activeProject && userProjects.length > 0) {
      const defaultProject = userProjects[0];
      setActiveWorkspace({
        icon: defaultProject?.icon ?? "https://i.pravatar.cc/150?img=62",
        name: defaultProject.name,
        createdAt: `Created ${calculateDaysFromDate(
          defaultProject.createdAt
        )} days ago`,
      });
      dispatch(setActiveProject(defaultProject));
      setIsWorkspaceActive(true);
    }
  }, [activeProject, userProjects, dispatch]);

  const handleWorkspace = (item: any) => {
    setIsWorkspaceActive(true);
    setActiveWorkspace({
      icon: item?.icon ?? "https://i.pravatar.cc/150?img=62",
      name: item.name,
      createdAt: `Created ${calculateDaysFromDate(item.createdAt)} days ago`,
    });
    dispatch(setActiveProject(item));
  };

  const RenderWorkSpace = () => {
    if (!isWorkspaceActive)
      return (
        <div className="lg:flex hidden px-2 justify-between w-full items-center">
          Select a workspace <ChevronDown className="ml-auto" />
        </div>
      );

    return (
      <div
        className={`flex gap-0 px-0 lg:gap-2 items-center ${
          isSidebarCollapsed ? "justify-center p-2" : "justify-start"
        }`}
      >
        <img
          src={activeWorkspace.icon}
          alt="activeWorkspace"
          className="w-10 h-10 rounded-sm"
        />

        <div
          className={`${
            isSidebarCollapsed ? "lg:hidden" : "block"
          } hidden lg:block`}
        >
          <p className=" text-sm font-semibold text-gray-900">
            {activeWorkspace.name}
          </p>
          <span className="text-xs text-gray-500">
            {activeWorkspace.createdAt}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center text-gray-700 pb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={`bg-white hover:bg-[#E6E6E6] h-full cursor-pointer ${
              isSidebarCollapsed ? "p-0" : "p-2"
            } rounded-md w-full`}
          >
            <RenderWorkSpace />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-popper-anchor-width] divide-y min-w-48">
          {userProjects.map((item: any, index: number) => {
            const daysSinceCreated = calculateDaysFromDate(item.createdAt);
            return (
              <DropdownMenuItem
                className="px-0 lg:px-3"
                key={index}
                onClick={() => handleWorkspace(item)}
              >
                <img
                  src={item?.icon ?? "https://i.pravatar.cc/150?img=62"}
                  alt="item"
                  className="h-8 w-8 rounded-md"
                />
                <div className="flex flex-col flex-wrap">
                  <p className="text-[10px] lg:text-sm font-medium">
                    {item?.name}
                  </p>
                  <span className="text-[8px] tracking-tighter lg:text-xs text-gray-500">
                    Created {daysSinceCreated} days ago
                  </span>
                </div>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuItem className="px-0 lg:px-1">
            <p
              className="text-center text-sm font-medium text-gray-500 cursor-pointer px-2"
              onClick={() => setIsModalOpen(true)}
            >
              + Create new team
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddTeam isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector(selectUser);
  const userProjects = useAppSelector(selectUserProjects);
  const activeProject = useAppSelector(selectActiveProject);
  const location = useLocation();
  const [Logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await Logout("");
      if (data.success) {
        toast.success("Logged out successfully");
        dispatch(logout());
        localStorage.clear();
        navigate("/", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const actionMenuItems = [
    <div
      className="flex gap-2 items-center text-gray-500 font-medium"
      key="support"
    >
      <BiSupport />
      <span>Support</span>
    </div>,
    <div
      className="flex gap-2 items-center text-gray-500 font-medium"
      key="logout"
      onClick={handleLogout}
    >
      <TbLogout2 />
      <span>Log Out</span>
    </div>,
  ];

  useEffect(() => {
    const activePage = location.pathname.substring(1);
    setActiveItem(activePage);
  }, [location]);

  console.log(isCollapsed);

  return (
    <div
      className={mergeClasses(
        "flex flex-col h-screen transition-width duration-300 bg-dashboard w-20",
        isCollapsed ? "lg:w-16" : "lg:w-64"
      )}
    >
      <div className="justify-end hidden lg:flex">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="-mr-2 py-2 rounded-md text-gray-500 hover:text-gray-700 "
        >
          <PiCaretDoubleLeftBold
            className={mergeClasses(
              "w-5 h-5 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
        </button>
      </div>
      <div
        className={`${
          isCollapsed ? "lg:px-2" : "lg:px-6"
        } px-3 flex flex-col justify-around h-full py-3 lg:py-0`}
      >
        {/* Sidebar Header */}
        <>
          <SidebarHead
            userProjects={userProjects}
            activeProject={activeProject as ProjectsType}
            isSidebarCollapsed={isCollapsed}
          />
          <div className=" text-sm text-gray-700">
            <div className="border-b pb-3">
              {!isCollapsed && (
                <h1 className={` hidden text-xs text-gray-500 lg:block ml-1`}>
                  Application
                </h1>
              )}
              <nav className="flex flex-col mt-4 space-y-2">
                {menuItems.map((item, index) => (
                  <Link
                    to={item.url}
                    className={`flex items-center gap-2 px-2 rounded-md min-h-8 h-full justify-center  ${
                      isCollapsed ? "justify-center" : "lg:justify-start"
                    } ${activeItem === item.identifier ? "bg-white" : ""}`}
                    key={index}
                  >
                    <item.icon
                      className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4"}`}
                    />
                    {!isCollapsed && (
                      <span className="hidden lg:block">{item.title}</span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-4">
              {!isCollapsed && (
                <h1 className="hidden text-xs text-gray-500 lg:block ml-1">
                  Misc
                </h1>
              )}

              <nav className="flex flex-col mt-4 space-y-2">
                {miscItems.map((item) => (
                  <Link
                    to={item.url}
                    className={`flex items-center gap-2 px-2 rounded-md min-h-8 h-full justify-center  ${
                      isCollapsed ? "justify-center" : "lg:justify-start"
                    } ${activeItem === item.identifier ? "bg-white" : ""}`}
                  >
                    <item.icon
                      className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4"}`}
                    />
                    {!isCollapsed && (
                      <span className="hidden lg:block">{item.title}</span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
        {/* Sidebar Footer */}
        <div className="flex items-center justify-start border-t border-gray-200 mt-auto">
          <div
            className={`flex pt-3 pb-8 ${
              isCollapsed ? "justify-center" : "justify-between"
            } relative w-full`}
          >
            <div
              className={`flex items-start gap-3 ${
                isCollapsed ? "cursor-pointer" : ""
              }`}
              onClick={isCollapsed ? () => setIsOpen(!isOpen) : undefined}
            >
              <img
                src={user?.avatar?.url}
                alt="workspace"
                className="w-10 h-10 rounded-md"
              />
              {!isCollapsed && (
                <div className="hidden lg:block text-sm">
                  <div>{user?.email?.split("@")[0]}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <DotsDropdown
                items={actionMenuItems}
                id="1"
                direction={DROPDOWN_DIRECTION.UP}
                isSidebarCollapsed={isCollapsed}
              />
            )}
            {isOpen && isCollapsed && (
              <div className="absolute left-12 bottom-16 bg-white shadow-md rounded-md z-50 w-40 py-2">
                {actionMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
