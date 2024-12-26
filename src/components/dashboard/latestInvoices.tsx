import { MdOutlineArrowOutward } from "react-icons/md";
import { Table } from "../shared/table";

type TableData = {
  headers: string[];
  body: { [key: string]: string | number | any }[];
};

const tableData: TableData = {
  headers: ["Invoice Number", "Amount", "  Date  ", "Status"],
  body: [
    {
      invoicenumber: "1234",
      amount: "$100",
      date: "2024-01-01",
      status: (
        <p className="px-2 py-1 rounded-full bg-green-200 text-green-700 text-center my-0">
          Completed
        </p>
      ),
    },
    {
      invoicenumber: "1235",
      amount: "$200",
      date: "2024-02-01",
      status: (
        <p className="px-2 py-1 rounded-full bg-red-200 text-red-700 text-center">
          Cancelled
        </p>
      ),
    },
    {
      invoicenumber: "1236",
      amount: "$300",
      date: "2024-03-01",
      status: (
        <p className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-center">
          Refunded
        </p>
      ),
    },
    {
      invoicenumber: "1234",
      amount: "$100",
      date: "2024-01-01",
      status: (
        <p className="px-2 py-1 rounded-full bg-green-200 text-green-700 text-center">
          Completed
        </p>
      ),
    },
    {
      invoicenumber: "1235",
      amount: "$200",
      date: "2024-02-01",
      status: (
        <p className="px-2 py-1 rounded-full bg-red-200 text-red-700 text-center">
          Cancelled
        </p>
      ),
    },
    {
      invoicenumber: "1236",
      amount: "$300",
      date: "2024-03-01",
      status: (
        <p className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-center">
          Refunded
        </p>
      ),
    },
  ],
};

export const LatestInvoices = () => {
  return (
    <div className="flex flex-col h-full w-full gap-2">
      <div className="flex items-center justify-between">
        <div className="flex text-gray-800 font-medium gap-1 items-center">
          <h1>Latest Invoices</h1>
          <MdOutlineArrowOutward className="text-sky-600" />
        </div>
        <p className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">
          Clear Invoices
        </p>
      </div>
      <Table {...tableData} />
    </div>
  );
};
