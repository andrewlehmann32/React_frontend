import { RDropdownMenu } from "../shared/menus/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DisplayPaymentMethods } from "./display-payment-methods";
import { RenderInvoicesTable } from "./render-table";

const cardItems = [
  { title: "Current Bill", subTitle: "As of today", amount: "$133.18" },
  {
    title: "Estimated Monthly Bill",
    subTitle: "January 17 - February 17,2024",
    amount: "$143.18",
  },
];

const DisplayBillCards = () => {
  return (
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
  );
};

const DisplayCouponAndTaxField = () => {
  return (
    <div className="justify-between items-center grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-3">
      <div className="flex flex-col">
        <h1 className="py-4 font-medium text-md">Coupon</h1>
        <Input placeholder="Enter your coupon code" className="rounded-sm" />
        <div className="flex py-4 justify-end items-center">
          <Button className="bg-white text-gray-900 border shadow-none hover:text-white">
            Add Coupon
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="py-4 font-medium text-md">Tax ID</h1>
        <RDropdownMenu items={[]} placeholder="select an ID type" />
        <div className="flex py-4 justify-end items-center">
          <Button className="bg-white text-gray-900 border shadow-none hover:text-white">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Main = () => {
  return (
    <div className="py-2 gap-2 flex flex-col pr-0 lg:pr-6 w-full divide-y">
      <div className="flex flex-col">
        <DisplayBillCards />
        <DisplayPaymentMethods />
        <DisplayCouponAndTaxField />
        <RenderInvoicesTable />
      </div>
    </div>
  );
};
