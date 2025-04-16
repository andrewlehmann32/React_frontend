import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { environment } from "../../config/environment";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import axios from "../../lib/apiConfig";
import { setActiveProject } from "../../redux/reducer/userSlice";
import {
  selectActiveProject,
  selectUser,
} from "../../redux/selectors/userSelector";
import { SpendType } from "../dashboard/monthlySpendage";
import { CreditsModal } from "../shared/modals/credits-modal";

const RenderBillingCards = ({ cardItems }: { cardItems: any[] }) => {
  return (
    <>
      <div className="w-full sm:w-2/5 flex flex-col justify-between font-medium">
        <h1 className="text-xl pb-3">Billing</h1>
        <h1 className="text-md pt-3 pb-2 sm:pb-0">Payment Methods</h1>
      </div>
      <div className="w-full sm:w-3/5 flex items-center gap-3 justify-end">
        {cardItems.map((item, index) => (
          <div
            key={index}
            className={`w-1/3 border px-4 py-2 gap-1 min-h-20 text-xs rounded-md min-w-0 sm:min-w-[8rem] sm:w-fit text-gray-500 cursor-pointer active:scale-95 ${
              index === 0 ? "flex flex-col justify-center" : ""
            }`}
            onClick={item.action}
          >
            <h5 className="font-medium">{item.title}</h5>
            <h1 className="font-semibold text-lg text-gray-900">
              {item.amount}
            </h1>
            <span className="text-[10px]">{item.subTitle}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export const DisplayBillCards = () => {
  const { user } = useAppSelector(selectUser);
  const isAdmin = user?.role === "admin";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCredits, setNewCredits] = useState("");
  const [spendage, setSpendage] = useState<SpendType>();
  const currentProject = useAppSelector(selectActiveProject);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMonthlySpendage = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering/${user?._id}/spendage`
        );
        setSpendage(response?.data?.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchMonthlySpendage();
  }, []);

  const getMonthRange = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return `${start.toLocaleString("default", {
      month: "long",
    })} 1 - ${end.toLocaleString("default", {
      month: "long",
    })} ${end.getDate()}, ${now.getFullYear()}`;
  };

  const cardItems = [
    {
      title: "Available Credit",
      amount: `$${currentProject?.credit ?? 0}`,
      action: () => setIsModalOpen(true),
    },
    {
      title: "Current Bill",
      subTitle: "As of now",
      amount: `$${spendage?.monthlySpend?.current || "-"}`,
      action: () => {},
    },
    {
      title: "Estimated Monthly Bill",
      subTitle: getMonthRange(),
      amount: `$${spendage?.monthlySpend?.expected || "-"}`,
      action: () => {},
    },
  ];

  const handleSaveCredits = async () => {
    if (!currentProject) return;
    try {
      if (!isAdmin && Number(newCredits) < 0) {
        toast.error("You cannot remove credits");
        return;
      }
      const credit = parseFloat(Number(newCredits).toFixed(2));
      if (credit === 0) {
        toast.error("Amount should be greater than $0");
        return;
      }
      const defaultPaymentMethod = currentProject?.defaultPaymentMethod;
      if (!defaultPaymentMethod) {
        toast.error("No default payment method found");
        return;
      }
      const response = await axios.put(
        `${environment.VITE_API_URL}/projects/update-credit/${
          currentProject._id || currentProject
        }`,
        { credit, defaultPaymentMethod }
      );
      if (response.status === 200 && response.data?.project) {
        toast.success("Credits added successfully");
        dispatch(setActiveProject(response.data.project));
      }
      setNewCredits("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating credits:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <CreditsModal
        availableCredits={currentProject?.credit ?? 0}
        credits={newCredits}
        handleSave={handleSaveCredits}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        setCredits={setNewCredits}
      />
      <RenderBillingCards cardItems={cardItems} />
    </div>
  );
};
