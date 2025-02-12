import { useState } from "react";
import { PageLayout } from "../../components/layouts/pageLayout";
import { Button } from "../../components/ui/button";
import { Main } from "../../components/resources/main";

const serverList = [
  {
    id: 1,
    name: "Ubuntu_webdav",
    ip: "174.193.182.199",
    specs: "1 Core, 12 GB",
  },
  {
    id: 2,
    name: "Ubuntu_webdav",
    ip: "174.193.182.199",
    specs: "1 Core, 12 GB",
  },
  {
    id: 3,
    name: "Ubuntu_webdav",
    ip: "174.193.182.199",
    specs: "1 Core, 12 GB",
  },
  {
    id: 4,
    name: "Ubuntu_webdav",
    ip: "174.193.182.199",
    specs: "1 Core, 12 GB",
  },
  {
    id: 5,
    name: "Ubuntu_webdav",
    ip: "174.193.182.199",
    specs: "1 Core, 12 GB",
  },
];

const Resources = () => {
  const [selectedId, setSelectedId] = useState<number | null>(1);

  return (
    <div className="flex">
      <div className="w-[25%] p-3">
        <div className="flex flex-col p-3 border-l min-h-full">
          <Button className="w-1/6">+</Button>
          <h1 className="mt-4 mb-1 text-gray-500 text-sm">
            Active Servers (5)
          </h1>
          <div className="flex flex-col">
            {serverList.map((server, index) => (
              <div
                key={server.id}
                className={`py-5 min-h-[80px] ${
                  selectedId === server.id ? "bg-white rounded-lg" : ""
                } ${
                  index < serverList.length - 1 &&
                  selectedId !== server.id &&
                  selectedId !== serverList[index + 1]?.id
                    ? "border-b"
                    : "border-b border-transparent"
                } ${selectedId !== server.id ? "rounded-t-lg" : ""}`}
                onClick={() => setSelectedId(server.id)}>
                <div className="flex justify-between items-center text-xs px-2">
                  <div>
                    <p className="text-md font-semibold mb-1">{server.name}</p>
                    <p className="text-gray-600">{server.ip}</p>
                  </div>
                  <div className="mt-2 px-3 py-1 text-gray-500 bg-gray-200 rounded-lg inline-block text-xs font-medium">
                    {server.specs}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[75%]">
        <PageLayout>
          <Main />
        </PageLayout>
      </div>
    </div>
  );
};

export default Resources;
