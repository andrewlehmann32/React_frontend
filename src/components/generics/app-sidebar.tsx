// Imports:
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSupport } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";
import {
  DROPDOWN_DIRECTION,
  menuItems,
  miscItems,
} from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useLogoutMutation } from "../../redux/api/user-api";
import { logout } from "../../redux/reducer/userSlice";
import {
  selectUser,
  selectUserProjects,
} from "../../redux/selectors/userSelector";
import { DotsDropdown } from "../shared/menus/simple-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const SidebarHead = ({ workspaces }: any) => {
  const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);

  const RenderWorkSpace = () => {
    if (!isWorkspaceActive)
      return (
        <div className="lg:flex hidden px-2 justify-between w-full items-center">
          Select a workspace <ChevronDown className="ml-auto" />
        </div>
      );

    // return (
    //   <div className="flex gap-0 px-0 lg:gap-2 lg:px-1 items-center">
    //     <div>
    //       <img src={workspace.icon} alt="workspace" className="w-10 h-10" />
    //     </div>
    //     <div className="hidden md:block">
    //       <p className="hidden lg:block text-sm font-semibold">
    //         {" "}
    //         {workspace.name}
    //       </p>
    //       <span className="hidden lg:block text-xs text-gray-500">
    //         {workspace.createdAt}
    //       </span>
    //     </div>
    //   </div>
    // );
  };

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="bg-white hover:bg-[#E6E6E6] h-full">
                <RenderWorkSpace />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-popper-anchor-width]"
              onClick={() => setIsWorkspaceActive(true)}
            >
              {workspaces?.map(({ item, index }: any) => (
                <DropdownMenuItem className="px-0 lg:px-1" key={index ?? 1}>
                  <img src={item?.icon} alt="item" />
                  <div className="flex flex-col flex-wrap">
                    <p className="text-[10px] lg:text-sm font-medium">
                      {item?.name}
                    </p>
                    <span className="text-[8px] tracking-tighter lg:text-xs text-gray-500">
                      {item?.createdAt}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export const AppSidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const { user } = useAppSelector(selectUser);
  const userProjects = useAppSelector(selectUserProjects);
  console.log({ userProjects });
  const [Logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await Logout("");
      if (data.success) {
        toast.success("Logged out successfully");
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("id");
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
      key="duplicate"
    >
      <BiSupport />
      <span>Support</span>
    </div>,
    <div
      className="flex gap-2 items-center text-gray-500 font-medium"
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
    <Sidebar className="w-fit border-none sm:h-screen lg:w-64 lg:transition-all lg:duration-300">
      <div className="overflow-hidden px-4 lg:pl-4 py-4 h-full flex flex-col bg-dashboard">
        <SidebarHead workspaces={userProjects} />
        <SidebarContent className="flex flex-col flex-grow justify-between divide-y">
          <div className="divide-y">
            <SidebarGroup>
              <SidebarGroupLabel className="hidden lg:block ">
                Application
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className={`flex items-center gap-2 min-h-8 h-full ${
                            activeItem === item.identifier ? "bg-white" : ""
                          }`}
                        >
                          <item.icon className="w-6 h-6" />
                          <span className="hidden lg:block">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className="hidden lg:block">
                Misc
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {miscItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className={`flex items-center gap-2 ${
                            activeItem === item.identifier ? "bg-white" : ""
                          }`}
                        >
                          <item.icon className="w-6 h-6" />
                          <span className="hidden lg:block ">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <div className="flex py-3 justify-between relative">
                <div className="flex items-start  gap-3">
                  <img
                    // src={user?.avatar }
                    alt="workspace"
                    className="w-10 h-10"
                  />
                  <div className="hidden lg:block">
                    <div>{user?.email?.split("@")[0]}</div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <DotsDropdown
                  items={actionMenuItems}
                  id="1"
                  direction={DROPDOWN_DIRECTION.UP}
                />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
};
