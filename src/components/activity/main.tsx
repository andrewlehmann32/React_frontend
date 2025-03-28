import { useEffect, useState } from "react";
import { FaBomb } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiServerStack } from "react-icons/hi2";
import { environment } from "../../config/environment";
import { useAppSelector } from "../../hooks/redux";
import axios from "../../lib/apiConfig";
import { selectUser } from "../../redux/selectors/userSelector";
import { Table } from "../shared/table";
import { Button } from "../ui/button";

export const Main = () => {
  const [tableBody, setTableBody] = useState([]);
  const { user } = useAppSelector(selectUser);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/logs/${user?._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const logs = response?.data?.data;
        const mappedLogs = logs.map((log: any) => ({
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
        }));

        setTableBody(mappedLogs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogs();
  }, []);

  const tableData = {
    headers: ["Event", "Project", "Author", "Date"],
    body: tableBody,
  };

  return (
    <div className="py-2 gap-4 flex flex-col pr-0 lg:pr-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium py-1">Activity Log</h1>
        <div className="flex">
          <Button className="bg-white text-gray-600 shadow-none hover:bg-gray-50 ">
            Sort by Date
          </Button>
          <Button className="bg-white text-gray-600 shadow-none hover:bg-gray-50 ">
            {" "}
            <GoPlus />
            Add Filter
          </Button>
        </div>
      </div>
      <div className="flex w-full overflow-x-auto">
        <Table {...tableData} />
      </div>
    </div>
  );
};
