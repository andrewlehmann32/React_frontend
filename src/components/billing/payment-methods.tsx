import { FaRegTrashCan } from "react-icons/fa6";
import { TiPencil } from "react-icons/ti";

type PaymentMethodProps = {
  expiry: string;
  cardNumber: string;
  default?: boolean;
  onDelete: () => void;
};

export const PaymentMethods = ({
  cardNumber,
  expiry,
  default: isDefault,
  onDelete,
}: PaymentMethodProps) => {
  const renderDefault = () => {
    if (!isDefault) return null;
    return (
      <div className="flex items-center gap-1 pl-0 xl:pl-14 pr-0 lg:pr-4">
        <span className="w-1.5 h-1.5 bg-sky-600 rounded-full"></span>
        <p>Default</p>
      </div>
    );
  };

  return (
    <div
      className={`flex border p-5 text-sm text-gray-500 rounded-lg gap-5 lg:gap-10 ${
        isDefault ? "justify-end" : "justify-center"
      } `}
    >
      <h1 className="font-semibold text-gray-900">{cardNumber}</h1>
      <div className="flex items-center gap-2">
        <p>{expiry}</p>
        <FaRegTrashCan
          onClick={onDelete}
          className="cursor-pointer hover:text-gray-900"
        />
        {!isDefault && <TiPencil className="text-base" />}
      </div>
      {renderDefault()}
    </div>
  );
};
