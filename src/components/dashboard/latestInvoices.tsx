import { MdOutlineArrowOutward } from "react-icons/md";
import { InvoiceStatus } from "../../constants/constants";
import { useAppSelector } from "../../hooks/redux";
import { formatTime, formatTimestamp } from "../../lib/helpers/utils";
import { selectActiveProject } from "../../redux/selectors/userSelector";
import { Table } from "../shared/table";

type TableData = {
  headers: string[];
  body: { [key: string]: string | number | any }[];
};

export const LatestInvoices = () => {
  const activeProject = useAppSelector(selectActiveProject);

  const tableData: TableData = {
    headers: ["Invoice Number", "Amount", "  Date", "Time", "Status"],
    body:
      activeProject?.invoices
        ?.sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        )
        ?.map((invoice) => ({
          invoicenumber: invoice.invoiceNumber,
          amount: `$${invoice.amount}`,
          date: formatTimestamp(invoice.createdAt),
          time: formatTime(invoice.createdAt),
          status: (
            <p
              className={`px-2 py-1 rounded-full ${
                invoice.status === InvoiceStatus.PAID
                  ? "bg-green-200 text-green-700"
                  : invoice.status === InvoiceStatus.OVERDUE
                  ? "bg-red-200 text-red-700"
                  : "bg-gray-200 text-gray-700"
              }  text-center my-0 w-full max-w-20`}
            >
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </p>
          ),
        })) || [],
  };
  return (
    <div className="flex flex-col h-full w-full gap-2 max-h-[18.5rem] overflow-scroll">
      <div className="flex items-center justify-start">
        <div className="flex text-gray-800 font-medium gap-1 items-center">
          <h1>Latest Invoices</h1>
          <MdOutlineArrowOutward className="text-sky-600" />
        </div>
        {/* <p className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">
          Clear Invoices
        </p> */}
      </div>
      <Table {...tableData} />
    </div>
  );
};
