import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { environment } from "../../config/environment";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import axios from "../../lib/apiConfig";
import {
  setActiveProject,
  setUserProjects,
} from "../../redux/reducer/userSlice";
import {
  selectActiveProject,
  selectUser,
} from "../../redux/selectors/userSelector";
import { ProjectsType } from "../../types/generics.types";
import { AddPaymentMethod } from "./addPaymentMethod";
import { PaymentMethods } from "./payment-methods";

const stripePromise = loadStripe(environment.STRIPE_PUBLISHABLE_KEY!);

export const DisplayPaymentMethods = () => {
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState("");
  const activeProject = useAppSelector(selectActiveProject);
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setDefaultPaymentMethod(activeProject?.defaultPaymentMethod ?? "");
  }, [activeProject]);

  const fetchAndDispatchProjects = async () => {
    try {
      const response = await axios.get(
        `${environment.VITE_API_URL}/projects/`,
        {
          params: {
            userId: user?._id,
          },
        }
      );

      if (response.status === 200) {
        dispatch(setUserProjects(response.data?.projects));
        const currentProject = response.data.projects.find(
          (project: ProjectsType) => project._id === activeProject?._id
        );

        dispatch(setActiveProject(currentProject));
        setDefaultPaymentMethod(currentProject?.defaultPaymentMethod || null);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
    }
  };

  const showDeletePopup = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      handleDeletePaymentMethod(id);
    }
  };

  const handleDeletePaymentMethod = async (paymentMethodId: string) => {
    if (!activeProject?._id) {
      toast.error("Project not found");
      return;
    }

    if (!paymentMethodId) {
      toast.error("Invalid payment method");
      return;
    }
    try {
      const response = await axios.post(
        `${environment.VITE_API_URL}/projects/remove-payment-method/`,
        {
          projectId: activeProject._id,
          paymentMethodId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Payment method deleted successfully");
        fetchAndDispatchProjects();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the payment method");
    }
  };

  const updateDefaultMethod = async (paymentMethodId: string) => {
    try {
      const response = await axios.post(
        `${environment.VITE_API_URL}/projects/set-default-payment-method/`,
        {
          projectId: activeProject?._id,
          paymentMethodId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setDefaultPaymentMethod(paymentMethodId);
        toast.success("Default payment method updated successfully");
        fetchAndDispatchProjects();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to set default payment method");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-5 items-center">
      {activeProject?.paymentMethods?.map((item: any, index: number) => {
        const { brand, last4, exp_year, exp_month } = item.paymentMethod.card;

        const cardNumber = `${brand} **** ${last4}`;
        const expiry = `Expires ${exp_month}/${exp_year}`;
        const isDefault = item._id === defaultPaymentMethod;
        return (
          <PaymentMethods
            cardNumber={cardNumber}
            expiry={expiry}
            default={isDefault}
            key={index}
            handleUpdate={() => updateDefaultMethod(item._id)}
            onDelete={() => showDeletePopup(item._id)}
          />
        );
      })}

      <Elements stripe={stripePromise}>
        <AddPaymentMethod reFetch={fetchAndDispatchProjects} />
      </Elements>
    </div>
  );
};
