import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { getCodeList } from "country-list";
import { DROPDOWN_DIRECTION } from "../../constants/constants";
import { RDropdownMenu } from "../shared/menus/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const countryOptions = Object.entries(getCodeList()).map(([code, name]) => ({
  value: code,
  label: name,
}));

type AddPaymentFormType = {
  userData: any;
  handleInputChange: (field: string, value: string) => void;
  onSave: () => void;
  loading: boolean;
};

export const AddPaymentForm = ({
  userData,
  handleInputChange,
  onSave,
  loading,
}: AddPaymentFormType) => {
  return (
    <div className="flex flex-col gap-3">
      {/* User Details */}
      <span>
        <Label htmlFor="name" className="font-normal text-gray-500">
          Name
        </Label>
        <Input
          id="name"
          placeholder="Name"
          className="px-4 mt-1"
          value={userData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </span>

      {/* Card Details */}
      <div>
        <Label htmlFor="cardNumber" className="font-normal text-gray-500">
          Card Number
        </Label>
        <CardNumberElement
          id="cardNumber"
          className="rounded border border-gray-300 p-2 dark:text-white"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="expiry" className="font-normal text-gray-500">
            Expiry
          </Label>
          <CardExpiryElement
            id="expiry"
            className="rounded border border-gray-300 p-2 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="cvc" className="font-normal text-gray-500">
            CVC
          </Label>
          <CardCvcElement
            id="cvc"
            className="rounded border border-gray-300 p-2 dark:text-white"
          />
        </div>
      </div>

      {/* Address Details */}
      <span>
        <Label htmlFor="addressLine1" className="font-normal text-gray-500">
          Address Line 1
        </Label>
        <Input
          id="addressLine1"
          placeholder="Address Line 1"
          className="px-4 mt-1"
          value={userData.addressLine1}
          onChange={(e) => handleInputChange("addressLine1", e.target.value)}
        />
      </span>
      <span>
        <Label htmlFor="addressLine2" className="font-normal text-gray-500">
          Address Line 2
        </Label>
        <Input
          id="addressLine2"
          placeholder="Address Line 2"
          className="px-4 mt-1"
          value={userData.addressLine2}
          onChange={(e) => handleInputChange("addressLine2", e.target.value)}
        />
      </span>
      <span>
        <Label htmlFor="city" className="font-normal text-gray-500">
          City
        </Label>
        <Input
          id="city"
          placeholder="City"
          className="px-4 mt-1"
          value={userData.city}
          onChange={(e) => handleInputChange("city", e.target.value)}
        />
      </span>
      <div className="flex gap-3 items-center">
        <span>
          <Label htmlFor="city" className="font-normal text-gray-500">
            Zip Code
          </Label>
          <Input
            id="zipCode"
            placeholder="Zip Code"
            className="px-4 mt-1"
            value={userData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
          />
        </span>
        <span>
          <Label htmlFor="state" className="font-normal text-gray-500">
            State
          </Label>
          <Input
            id="state"
            placeholder="State"
            className="px-4 mt-1"
            value={userData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
          />
        </span>
      </div>
      <span className="flex flex-col gap-2">
        <Label htmlFor="country" className="font-normal text-gray-500">
          Country
        </Label>
        <RDropdownMenu
          items={countryOptions}
          placeholder="Select a country"
          onChange={(value) => handleInputChange("country", value)}
          value={
            countryOptions.find((item) => item.value === userData.country)
              ?.label || "Select a country"
          }
          direction={DROPDOWN_DIRECTION.TOP}
        />
      </span>

      <div className="flex justify-end pt-4">
        <Button onClick={onSave} disabled={loading}>
          {loading ? "Adding..." : "Add Payment Method"}
        </Button>
      </div>
    </div>
  );
};
