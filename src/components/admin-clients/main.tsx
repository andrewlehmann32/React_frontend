import axios from "axios";
import { useEffect, useState } from "react";
import { environment } from "../../config/environment";
import { formatTimestamp } from "../../lib/helpers/utils";
import { User } from "../../types/generics.types";
import { Table } from "../shared/table";

const token = localStorage.getItem("token");

export const Main = () => {
  const [clients, setClients] = useState<User[]>([]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${environment.VITE_API_URL}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(response?.data?.users);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const tableData = {
    headers: ["User", "dcim user id", "Email", "Projects", "Created At"],
    body: clients.map((member) => ({
      user: (
        <div className="flex gap-3 items-center">
          <img
            src={member?.avatar?.url}
            alt={member?.email}
            className="h-7 w-7 rounded-full"
          />
        </div>
      ),
      dcimuserid: (
        <p className="font-semibold">{member?.dcimUserId || "N/A"}</p>
      ),
      email: <p className="font-semibold">{member?.email}</p>,
      projects: (
        <p className="font-semibold">{member?.projects?.length || 0}</p>
      ),
      createdat: formatTimestamp(member?.createdAt),
    })),
  };

  return (
    <>
      <div>Clients</div>
      <div className="flex w-full overflow-x-auto">
        <Table {...tableData} />
      </div>
    </>
  );
};
