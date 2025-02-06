import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

type PaymentMethodProps = {
  expiry: string;
  cardNumber: string;
  default?: boolean;
  onDelete: () => void;
  handleUpdate: () => void;
};

export const PaymentMethods = ({
  cardNumber,
  expiry,
  default: isDefault = true,
  onDelete,
  handleUpdate,
}: PaymentMethodProps) => {
  const getCardLogo = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return <FaCcVisa className="text-blue-600 text-3xl" />;
      case "mastercard":
        return <FaCcMastercard className="text-red-600 text-3xl" />;
      case "american express":
      case "amex":
        return <FaCcAmex className="text-blue-500 text-3xl" />;
      default:
        return <span className="text-gray-500 text-3xl">💳</span>; // Generic card icon
    }
  };

  const renderDefault = () => {
    if (!isDefault)
      return (
        <p
          className="text-gray-500 hover:text-primary cursor-pointer"
          onClick={handleUpdate}
        >
          Set as Default
        </p>
      );
    return (
      <div className="flex items-center gap-1 pl-0 xl:pl-14 pr-0 lg:pr-4">
        <span className="w-1.5 h-1.5 bg-sky-600 rounded-full"></span>
        <p>Default</p>
      </div>
    );
  };

  return (
    <div
      className={`flex border p-5 text-sm text-gray-500 rounded-lg items-center justify-between gap-5 ${
        isDefault ? "border-sky-600" : ""
      } `}
    >
      <span className="flex items-center gap-5">
        <div className="flex-shrink-0">
          {getCardLogo(cardNumber.split(" ")[0])}
        </div>
        <h1 className="font-semibold text-gray-900">{cardNumber}</h1>
        <div className="flex items-center gap-2">
          <p>{expiry}</p>
          <FaRegTrashCan
            onClick={onDelete}
            className="cursor-pointer hover:text-gray-900"
          />
        </div>
      </span>
      {renderDefault()}
    </div>
  );
};

// export const PaymentMethods = ({
//   cardNumber,
//   expiry,
//   default: isDefault = false,
//   onDelete,
//   handleUpdate,
// }: PaymentMethodProps) => {
//   // Function to get appropriate card brand icon

//   return (
//     <div
//       className={`flex items-center p-4 border rounded-lg shadow-sm gap-4 bg-white transition-all ${
//         isDefault ? "border-blue-500 shadow-md" : "border-gray-300"
//       }`}
//     >
//       {/* Card Logo */}

//       {/* Card Details */}
//       <div className="flex flex-col flex-grow">
//         <h1 className="font-semibold text-gray-900">{cardNumber}</h1>
//         <p className="text-gray-500 text-sm">{expiry}</p>
//       </div>

//       {/* Actions */}
//       <div className="flex items-center gap-3">
//         {/* Default Indicator */}
//         {isDefault ? (
//           <div className="flex items-center gap-1 text-blue-600 text-sm">
//             <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
//             <p>Default</p>
//           </div>
//         ) : (
//           <p
//             className="text-gray-500 hover:text-blue-600 cursor-pointer text-sm"
//             onClick={handleUpdate}
//           >
//             Set as Default
//           </p>
//         )}

//         {/* Delete Icon */}
//         <FaRegTrashCan
//           onClick={onDelete}
//           className="cursor-pointer text-gray-500 hover:text-gray-900"
//         />
//       </div>
//     </div>
//   );
// };
