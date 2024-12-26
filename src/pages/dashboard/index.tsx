import { useState } from "react";
import { Main } from "../../components/dashboard/main";
import { AppSidebar } from "../../components/generics/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { items } from "../../constants/constants";

export default function Dashboard() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="w-full">
      <div className="border h-full min-h-screen w-full bg-dashboard relative flex ">
        <div className="flex flex-col sm:flex-row size-full w-full h-full">
          <div
            className={`w-20 h-full hidden sm:flex flex-col ${
              isSidebarCollapsed ? "lg:w-fit" : "lg:w-3/12"
            } `}
          >
            <SidebarProvider>
              <div className={`transition-all border-r flex`}>
                <AppSidebar />
                <div className="w-full hidden lg:flex lg:justify-center h-8 ">
                  <SidebarTrigger
                    className={`h-7 ${isSidebarCollapsed ? "rotate-180" : ""}`}
                    onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
                  />
                </div>
              </div>
            </SidebarProvider>
          </div>
          <div className="w-full flex-grow h-full min-h-screen p-0 sm:p-2">
            <Main />
          </div>
        </div>
        <div className="flex w-full fixed bg-white bottom-0 sm:hidden justify-center border-t shadow-lg">
          {items.map((item, index) => (
            <div className="px-6 py-3 text-base" key={index}>
              {<item.icon className={`w-8 h-8  }`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
