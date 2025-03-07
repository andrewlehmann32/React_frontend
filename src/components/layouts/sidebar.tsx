import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSupport } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { PiCaretDoubleLeftBold } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  adminMenuItems,
  DROPDOWN_DIRECTION,
  menuItems,
  miscItems,
} from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { calculateDaysFromDate, mergeClasses } from "../../lib/helpers/utils";
import { useLogoutMutation } from "../../redux/api/user-api";
import { logout, setActiveProject } from "../../redux/reducer/userSlice";
import {
  selectActiveProject,
  selectUser,
  selectUserProjects,
} from "../../redux/selectors/userSelector";
import { ProjectsType } from "../../types/generics.types";
import { AddTeam } from "../generics/add-team";
import { DotsDropdown } from "../shared/menus/simple-dropdown";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";

type SidebarHeaderProps = {
  userProjects: ProjectsType[];
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

  // const handleWorkspace = (item: any) => {
  //   setIsWorkspaceActive(true);
  //   setActiveWorkspace({
  //     icon: item?.icon ?? "https://i.pravatar.cc/150?img=62",
  //     name: item.name,
  //     createdAt: `Created ${calculateDaysFromDate(item.createdAt)} days ago`,
  //   });
  //   dispatch(setActiveProject(item));
  // };

  const RenderWorkSpace = () => {
    if (!isWorkspaceActive)
      return (
        <div
          className={`lg:flex hidden px-2   ${
            isSidebarCollapsed ? "justify-center" : "justify-between"
          }  w-full items-center ${isSidebarCollapsed ? "py-2" : ""}`}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon
            className={`${
              isSidebarCollapsed ? "" : "mr-auto"
            }  h-5 text-gray-600`}
          />
          {!isSidebarCollapsed && "Create a workspace"}
          {/* <ChevronDown className="ml-auto" /> */}
        </div>
      );

    return (
      <div
        className={`flex gap-2 md:gap-0 px-0 lg:gap-2 items-center ${
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
          } md:hidden lg:block`}
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

        {/* TODO: Feature for Later */}

        {/* <DropdownMenuContent className="w-[--radix-popper-anchor-width] divide-y min-w-48">
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
        </DropdownMenuContent> */}
      </DropdownMenu>

      <AddTeam isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector(selectUser);
  const isAdmin = user?.role === "admin";
  const sidebarMenu = isAdmin ? adminMenuItems : menuItems;
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
    } catch (e) {
      toast.error("Something went wrong.");
      console.error(e);
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

  return (
    <div
      className={mergeClasses(
        "flex flex-col sm:h-screen transition-width duration-300 bg-dashboard",
        isCollapsed ? "lg:w-16" : "lg:w-64"
      )}
    >
      <button
        className="block md:hidden p-3 text-gray-500 fixed top-2 left-2 z-50" // Visible only on mobile
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <FiMenu
          className={`w-6 h-6 transition-transform ${
            isMobileOpen ? "rotate-90" : ""
          }`}
        />
      </button>
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
        } px-3 flex-col justify-around h-full py-3 lg:py-0 ${
          isMobileOpen
            ? "fixed top-0 left-0 w-64 z-50 bg-white"
            : "hidden md:flex"
        }`}
      >
        {/* Sidebar Header */}
        <>
          {!isAdmin && (
            <SidebarHead
              userProjects={userProjects as ProjectsType[]}
              activeProject={activeProject as ProjectsType}
              isSidebarCollapsed={isCollapsed}
            />
          )}
          <div className=" text-sm text-gray-700">
            <div className={`${!isAdmin ? "border-b" : ""} pb-3`}>
              {!isCollapsed && !isAdmin && (
                <h1 className={` hidden text-xs text-gray-500 lg:block ml-1`}>
                  Application
                </h1>
              )}
              <nav
                className={`flex flex-col ${
                  !isAdmin ? "mt-4" : "mt-10"
                } space-y-2`}
              >
                {sidebarMenu.map((item, index) => (
                  <Link
                    to={item.url}
                    className={`flex items-center gap-2 px-2 rounded-md min-h-8 h-full md:justify-center  ${
                      isCollapsed ? "justify-center" : "lg:justify-start"
                    } ${activeItem === item.identifier ? "bg-white" : ""}`}
                    key={index}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <item.icon
                      className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4"}`}
                    />
                    {!isCollapsed && (
                      <span className="block md:hidden lg:block">
                        {item.title}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
            {!isAdmin && (
              <div className="mt-4">
                {!isCollapsed && (
                  <h1 className="hidden text-xs text-gray-500 lg:block ml-1">
                    Misc
                  </h1>
                )}

                <nav className="flex flex-col mt-4 space-y-2">
                  {miscItems.map((item, index) => (
                    <Link
                      to={item.url}
                      className={`flex items-center gap-2 px-2 rounded-md min-h-8 h-full md:justify-center  ${
                        isCollapsed ? "justify-center" : "lg:justify-start"
                      } ${activeItem === item.identifier ? "bg-white" : ""}`}
                      onClick={() => setIsMobileOpen(false)}
                      key={index}
                    >
                      <item.icon
                        className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4"}`}
                      />
                      {!isCollapsed && (
                        <span className="block md:hidden lg:block">
                          {item.title}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </>
        {/* Sidebar Footer */}
        <div className="flex items-center justify-start border-t border-gray-200 mt-64 sm:mt-auto">
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
                <div className="md:hidden lg:block text-sm">
                  <div>{user?.email?.split("@")[0]}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <DotsDropdown
                items={actionMenuItems}
                id="1"
                direction={DROPDOWN_DIRECTION.RIGHT}
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
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
