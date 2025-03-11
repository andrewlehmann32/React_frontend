import { RDropdownMenu } from "../shared/menus/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DisplayBillCards } from "./display-billing-cards";
import { DisplayPaymentMethods } from "./display-payment-methods";
import { RenderInvoicesTable } from "./render-table";

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
