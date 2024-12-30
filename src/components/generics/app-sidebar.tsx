// Imports:
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "../../components/ui/sidebar";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";
import { items, miscItems } from "../../constants/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const workspace = {
  name: "Project Oasis",
  icon: "/assets/workspace.png",
  createdAt: " Created 5 Days Ago",
};

const SidebarHead = () => {
  const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);

  const RenderWorkSpace = () => {
    if (!isWorkspaceActive)
      return (
        <div className="lg:flex hidden px-2 justify-between w-full items-center">
          Select a workspace <ChevronDown className="ml-auto" />
        </div>
      );

    return (
      <div className="flex gap-0 px-0 lg:gap-2 lg:px-1 items-center">
        <div>
          <img src={workspace.icon} alt="workspace" className="w-10 h-10" />
        </div>
        <div className="hidden md:block">
          <p className="hidden lg:block text-sm font-semibold">
            {" "}
            {workspace.name}
          </p>
          <span className="hidden lg:block text-xs text-gray-500">
            {workspace.createdAt}
          </span>
        </div>
      </div>
    );
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
              <DropdownMenuItem className="px-0 lg:px-1">
                <img src={workspace.icon} alt="workspace" />
                <div className="flex flex-col flex-wrap">
                  <p className="text-[10px] lg:text-sm font-medium">
                    {workspace.name}
                  </p>
                  <span className="text-[8px] tracking-tighter lg:text-xs text-gray-500">
                    {workspace.createdAt}
                  </span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export const AppSidebar = () => {
  return (
    <Sidebar className="w-fit border-none sm:h-screen lg:w-64 lg:transition-all lg:duration-300">
      <div className="overflow-hidden px-4 lg:pl-4 py-4 h-full flex flex-col bg-dashboard">
        <SidebarHead />
        <SidebarContent className="flex flex-col flex-grow justify-between divide-y">
          <div className="divide-y">
            <SidebarGroup>
              <SidebarGroupLabel className="hidden lg:block ">
                Application
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-2">
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
                        <a href={item.url} className="flex items-center gap-2">
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
              <div className="flex items-start gap-3 py-3">
                <img
                  src={workspace.icon}
                  alt="workspace"
                  className="w-10 h-10"
                />
                <div className="hidden lg:block">
                  <div>Jese Leos</div>
                  <div className="text-sm text-gray-500">
                    jeseleos@gmail.com
                  </div>
                </div>
                <BsThreeDots className="text-gray-400 cursor-pointer hidden lg:block" />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
};
