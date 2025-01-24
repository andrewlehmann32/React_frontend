import { ReactNode } from "react";
import Sidebar from "./sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="w-screen">
      <div className="border h-full min-h-screen w-full bg-dashboard relative flex ">
        <div className="flex  size-full w-full h-full flex-wrap">
          <div className={`h-full flex flex-col w-fit `}>
            <Sidebar />
          </div>
          <div className="w-full md:w-[80%] lg:w-8/12 flex-grow h-full min-h-screen p-0 sm:p-2 flex-wrap">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
