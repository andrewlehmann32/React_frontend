import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { environment } from "../../config/environment";
import { Chart } from "../generics/chart";

interface GridItem {
  title: string;
  value: string | number;
}

interface RenderGridProps {
  columns: GridItem[];
}

const RenderGrid: React.FC<RenderGridProps> = ({ columns }) => {
  return (
    <div className="grid lg:grid-rows-[20%_40%_40%] gap-4 lg:h-screen mt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 border-b">
        {columns.map((column, index) => (
          <div key={index} className="rounded-lg p-3 bg-gray-100">
            <div className="flex flex-col gap-2 justify-center items-center h-full">
              <p className="text-3xl font-semibold">{column.value}</p>
              <p className="text-sm">{column.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg p-3 bg-gray-100">
          <p>Specification</p>
          <Chart />
        </div>
        <div className="rounded-lg p-3 bg-gray-100">
          <Chart />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="rounded-lg p-3 bg-gray-100">
          <Chart />
        </div>
        <div className="rounded-lg p-3 bg-gray-100">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export const Main = () => {
  const [orderNumber, setOrderNumber] = useState<string | number>();
  const [clientNumber, setClientNumber] = useState<string | number>();

  const token = localStorage.getItem("token");
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
      setOrderNumber(response?.data?.data.length);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${environment.VITE_API_URL}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClientNumber(response?.data?.users.length);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const memoizedColumns = useMemo(
    () => [
      { title: "Total Orders", value: orderNumber ?? "-" },
      { title: "Active Clients", value: clientNumber ?? "-" },
      { title: "Active Servers", value: "N/A" },
      { title: "Predicted Revenue", value: "N/A" },
    ],
    [orderNumber, clientNumber]
  );

  useEffect(() => {
    fetchOrders();
    fetchClients();
  }, []);

  return <RenderGrid columns={memoizedColumns} />;
};
