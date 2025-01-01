import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../dashboard/header";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const location = useLocation();
  const currentPage = location.pathname.substring(1);
  const formattedPage = currentPage
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

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
