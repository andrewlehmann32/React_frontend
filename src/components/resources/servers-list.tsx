import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import {
  selectActiveProject,
  selectUser,
} from "../../redux/selectors/userSelector";
import { Button } from "../ui/button";

interface Server {
  id: number;
  name: string;
  ip: string;
  core?: number;
  ram?: number;
}

interface ServerItemProps {
  server: Server;
  selectedId: number | null;
  setSelectedId: (id: number) => void;
  isLastItem: boolean;
  previousItemSelected: boolean;
}
interface ServersListProps {
  devices: { id: number; name: string; ip: string }[];
  selectedId: number | null;
  loading: boolean;
  setSelectedId: (id: number) => void;
}

const ServerItem = memo(
  ({
    server,
    selectedId,
    setSelectedId,
    isLastItem,
    previousItemSelected,
  }: ServerItemProps) => {
    const isSelected = selectedId === server.id;
    const getStyles = () => {
      const baseStyles = "py-3 px-2 min-h-[80px] flex ";
      const selectedStyles = isSelected ? "bg-white rounded-lg" : "";
      const borderStyles =
        !isLastItem && !isSelected && !previousItemSelected
          ? "border-b"
          : "border-b border-transparent";
      const roundedStyles = !isSelected ? "rounded-t-lg" : "";

      return `${baseStyles} ${selectedStyles} ${borderStyles} ${roundedStyles}`;
    };

    return (
      <div
        className={getStyles()}
        onClick={() => setSelectedId(server.id)}
        role="button"
        aria-selected={isSelected}
      >
        <div className="flex lg:flex-col lg:gap-2 xl:flex-row justify-between w-full items-center text-xs px-2">
          <div>
            <p className="text-md font-semibold mb-1">{server?.name}</p>
            <p className="text-gray-600">{server?.ip}</p>
          </div>
          <div className="mt-2 px-3 py-1 text-gray-500 bg-gray-200 rounded-lg inline-block text-xs font-medium">
            {server?.core || "-"} Core, {server?.ram || "-"} GB
          </div>
        </div>
      </div>
    );
  }
);

export const ServersList = ({
  devices,
  selectedId,
  loading,
  setSelectedId,
}: ServersListProps) => {
  const { user } = useAppSelector(selectUser);
  const isAdmin = user?.role === "admin";
  const currentProject = useAppSelector(selectActiveProject);
  const navigate = useNavigate();

  const DisplayLoader = () => {
    if (!isAdmin && !currentProject) return null;
    if (loading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex flex-col flex-grow gap-1">
                <Skeleton
                  className="min-w-10"
                  width="60%"
                  height={20}
                  baseColor="#d1d5db"
                />
                <Skeleton
                  className="min-w-10"
                  width="40%"
                  height={15}
                  baseColor="#d1d5db"
                />
              </div>
              <Skeleton
                className="min-w-12"
                width="100%"
                height={20}
                baseColor="#d1d5db"
              />
            </div>
          ))}
        </div>
      );
    }
    if (!devices.length)
      return (
        <p className="text-center text-gray-500 mt-80 text-xl font-medium">
          No Active Servers
        </p>
      );
    return null;
  };

  return (
    <div className="w-[100%] lg:w-[24%] xl:w-[27%] p-3">
      <div className="flex flex-col p-3 lg:border-l h-screen">
        {!isAdmin && (
          <Button className="max-w-12" onClick={() => navigate("/ordering")}>
            +
          </Button>
        )}
        <h1 className="mt-4 mb-1 text-gray-500 text-sm">
          Active Servers ({devices.length})
        </h1>
        <div className="flex flex-col flex-grow overflow-y-auto">
          <DisplayLoader />
          {!loading &&
            devices.map((server, index) => (
              <ServerItem
                key={server?.id}
                server={server}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                isLastItem={index === devices.length - 1}
                previousItemSelected={selectedId === devices[index + 1]?.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
