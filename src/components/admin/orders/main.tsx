import axios from "axios";
import { useEffect, useState } from "react";
import { formatTimestamp } from "../../../lib/helpers/utils";
import { Table } from "../../shared/table";

const environment = import.meta.env;
const token = localStorage.getItem("token");

export const Main = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${environment.VITE_API_URL}/ordering/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response?.data?.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderBody = () => {
    return orders.map((order) => ({
      ip: (
        <p className="font-semibold cursor-pointer hover:underline">
          {order?.resource?.ip}
        </p>
      ),
      resourceid: (
        <p className="font-semibold">{order?.resource?.resourceId || "N/A"}</p>
      ),
      createdby: (
        <p className="font-semibold">
          {order?.projectId?.createdBy?.email?.split("@")[0] || "N/A"}
        </p>
      ),
      createdat: (
        <p className="font-semibold">
          {formatTimestamp(order?.createdAt) || "N/A"}
        </p>
      ),
    }));
  };

  const tableData = {
    headers: ["IP", "Resource Id", "Created By", "Created At"],
    body: renderBody(),
  };

  return (
    <>
      <div>Orders</div>
      <div className="flex w-full overflow-x-auto">
        <Table {...tableData} />
      </div>
    </>
  );
};
