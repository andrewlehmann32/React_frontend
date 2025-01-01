import { ReactNode } from "react";
import { Header } from "../dashboard/header";
import { useLocation } from "react-router-dom";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const location = useLocation();
  const currentPage = location.pathname.substring(1);
  const formattedPage =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1).toLowerCase();

  return (
    <div
      className="flex flex-wrap flex-col pl-4 gap-3 bg-white border rounded-lg p-3 "
      style={{ minHeight: "calc(100vh - 1.5rem)" }}
    >
      <Header title={formattedPage} />
      {children}
    </div>
  );
};

export { PageLayout };
