import { ReactNode, useState } from "react";
import { menuItems } from "../../constants/constants";
import { AppSidebar } from "../generics/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="w-screen">
      <div className="border h-full min-h-screen w-full bg-dashboard relative flex ">
        <div className="flex flex-col sm:flex-row size-full w-full h-full flex-wrap">
          <div
            className={`w-20 h-full hidden sm:flex flex-col ${
              isSidebarCollapsed ? "lg:w-fit" : "lg:w-fit"
            } `}
          >
            <SidebarProvider>
              <div className={`transition-all border-r flex`}>
                <AppSidebar isSidebarCollapsed={isSidebarCollapsed} />
                <div className="w-full hidden lg:flex lg:justify-center h-8 ">
                  <SidebarTrigger
                    className={`h-7 ${isSidebarCollapsed ? "rotate-180" : ""}`}
                    onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
                  />
                </div>
              </div>
            </SidebarProvider>
          </div>
          <div className="w-full md:w-[80%] lg:w-8/12 flex-grow h-full min-h-screen p-0 sm:p-2 flex-wrap">
            {children}
          </div>
        </div>
        <div className="flex w-full fixed bg-white bottom-0 sm:hidden justify-center border-t shadow-lg">
          {menuItems.map((item, index) => (
            <div className="px-6 py-3 text-base" key={index}>
              {<item.icon className={`w-8 h-8  }`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
