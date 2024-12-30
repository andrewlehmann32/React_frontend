import { ReactNode } from "react";
import { Header } from "../dashboard/header";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex flex-wrap h-full flex-col pl-4 gap-3 bg-white border rounded-lg p-3">
      <Header />
      {children}
    </div>
  );
};

export { PageLayout };
