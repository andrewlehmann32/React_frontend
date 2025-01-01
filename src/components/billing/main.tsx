import { RDropdownMenu } from "../shared/menus/dropdown-menu";
import { Table } from "../shared/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PaymentMethods } from "./payment-methods";

type TableData = {
  headers: string[];
  body: { [key: string]: string | number | any }[];
};

const cardItems = [
  { title: "Current Bill", subTitle: "As of today", amount: "$133.18" },
  {
    title: "Estimated Monthly Bill",
    subTitle: "January 17 - February 17,2024",
    amount: "$143.18",
  },
];

const tableData: TableData = {
  headers: ["Invoice Number", "Amount", "  Date  ", "Status"],
  body: [
    {
      invoicenumber: "1234",
      amount: "$100",
      date: "March 10,2024",
      status: (
        <p className="px-2 py-1 rounded-full bg-green-200 text-green-700 text-center my-0 w-full max-w-20">
          Completed
        </p>
      ),
    },
    {
      invoicenumber: "1235",
      amount: "$200",
      date: "March 10,2024",
      status: (
        <p className="px-2 py-1 rounded-full bg-red-200 text-red-700 text-center w-full max-w-20">
          Cancelled
        </p>
      ),
    },
    {
      invoicenumber: "1236",
      amount: "$300",
      date: "March 10,2024",
      status: (
        <p className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-center w-full max-w-20">
          Refunded
        </p>
      ),
    },
    {
      invoicenumber: "1234",
      amount: "$100",
      date: "March 10,2024",
      status: (
        <p className="px-2 py-1 rounded-full bg-green-200 text-green-700 text-center w-full max-w-20">
          Completed
        </p>
      ),
    },
    {
      invoicenumber: "1235",
      amount: "$200",
      date: "March 10,2024",
      status: (
        <p className="px-2 py-1 rounded-full bg-red-200 text-red-700 text-center w-full max-w-20">
          Cancelled
        </p>
      ),
    },
    {
      invoicenumber: "1236",
      amount: "$300",
      date: "March 10,2024",
      status: (
        <p className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-center w-full max-w-20">
          Refunded
        </p>
      ),
    },
  ],
};

export const Main = () => {
  return (
    <div className="py-2 gap-2 flex flex-col pr-0 lg:pr-6 w-full divide-y">
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="w-full sm:w-1/2 flex flex-col justify-between font-medium">
            <h1 className="text-xl pb-3">Billing</h1>
            <h1 className="text-md pt-3 pb-2 sm:pb-0">Payment Methods</h1>
          </div>
          <div className="w-full sm:w-1/2 flex items-center gap-3 justify-end">
            {cardItems.map((item, index) => (
              <div
                key={index}
                className="w-1/2 border px-4 py-2 gap-1 text-xs rounded-md min-w-0 sm:min-w-[13rem] sm:w-fit text-gray-500"
              >
                <h5 className="font-medium">{item.title}</h5>
                <h1 className="font-semibold text-lg text-gray-900">
                  {item.amount}
                </h1>
                <span className="text-[10px]">{item.subTitle}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-5">
          <PaymentMethods
            cardNumber="Via****8143"
            expiry="Expires 3/2026"
            default
          />

          <PaymentMethods
            cardNumber="American Express****6617"
            expiry="Expires 3/2026"
          />
        </div>
      </div>
      <div className="justify-between items-center grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-3">
        <div className="flex flex-col">
          <h1 className="py-4 font-medium text-md">Coupon</h1>
          <Input placeholder="Enter your coupon code" className="rounded-sm" />
          <div className="flex py-4 justify-end items-center">
            <Button className="bg-white text-gray-900 border shadow-none">
              Add Coupon
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="py-4 font-medium text-md">Tax ID</h1>
          <RDropdownMenu items={[]} placeholder="select an ID type" />
          <div className="flex py-4 justify-end items-center">
            <Button className="bg-white text-gray-900 border shadow-none">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full w-full gap-2 pt-4">
        <div className="flex text-gray-800 font-medium gap-1 items-center">
          <h1>Latest Invoices</h1>
        </div>
        <Table {...tableData} />
      </div>
    </div>
  );
};
