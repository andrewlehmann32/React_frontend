import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaBomb } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiServerStack } from "react-icons/hi2";
import { environment } from "../../config/environment";
import { useAppSelector } from "../../hooks/redux";
import axios from "../../lib/apiConfig";
import { selectUser } from "../../redux/selectors/userSelector";
import { Log, LogTableData } from "../../types/generics.types";
import { Table } from "../shared/table";
import { Button } from "../ui/button";

export const Main = () => {
  const [tableBody, setTableBody] = useState<LogTableData[]>([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const { user } = useAppSelector(selectUser);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/logs/${user?._id}`
        );
        const logs = response?.data?.data;
        const mappedLogs = logs
          .map((log: Log) => ({
            event: (
              <div className="flex items-center gap-2">
                {log.eventName === "server.destroy" && <FaBomb />}
                {log.eventName === "server.reinstall" && <HiServerStack />}
                {log.eventName === "server.deploy" && <HiServerStack />}
                <span>{log.eventName}</span>
              </div>
            ),
            project: log.projectName || "-",
            author: log.loggedBy?.email || "-",
            date: new Date(log.createdAt).toLocaleDateString(),
            createdAt: log.createdAt,
          }))
          .sort(
            (a: { createdAt: string }, b: { createdAt: string }) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        setTableBody(mappedLogs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogs();
  }, [user]);

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder);
    setTableBody((prevTableBody) =>
      [...prevTableBody].sort((a, b) =>
        newSortOrder === "desc"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    );
  };

  const tableData = {
    headers: ["Event", "Project", "Author", "Date"],
    body: tableBody,
  };

  return (
    <div className="py-2 gap-4 flex flex-col pr-0 lg:pr-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium py-1">Activity Log</h1>
        <div className="flex">
          <Button
            className="bg-white text-gray-600 shadow-none hover:bg-gray-50"
            onClick={toggleSortOrder}
          >
            Sort by Date{" "}
            {sortOrder === "desc" ? (
              <FaArrowDown className="text-gray-600 max-w-3 max-h-3" />
            ) : (
              <FaArrowUp className="text-gray-600 max-w-3 max-h-3" />
            )}
          </Button>
          <Button className="bg-white text-gray-600 shadow-none hover:bg-gray-50">
            <GoPlus /> Add Filter
          </Button>
        </div>
      </div>
      <div className="flex w-full overflow-auto max-h-[41rem]">
        <Table {...tableData} />
      </div>
    </div>
  );
};
