import { memo } from "react";
import { Button } from "../ui/button";

interface Server {
  id: number;
  name: string;
  ip: string;
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
            1 Core, 12 GB
          </div>
        </div>
      </div>
    );
  }
);

export const ServersList = ({
  devices,
  selectedId,
  setSelectedId,
}: ServersListProps) => {
  const DisplayLoader = () => {
    if (!devices.length) {
      return <div className="w-full text-center"> Loading...</div>;
    }
  };

  return (
    <div className="w-[100%] lg:w-[24%] xl:w-[27%] p-3">
      <div className="flex flex-col p-3 lg:border-l h-screen">
        <Button className="max-w-12">+</Button>
        <h1 className="mt-4 mb-1 text-gray-500 text-sm">
          Active Servers ({devices.length})
        </h1>
        <div className="flex flex-col flex-grow overflow-y-auto">
          <DisplayLoader />
          {devices.map((server, index) => (
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
