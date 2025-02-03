import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { environment } from "../../config/environment";
import { InvoiceStatus } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setActiveProject,
  setUserProjects,
} from "../../redux/reducer/userSlice";
import { selectActiveProject } from "../../redux/selectors/userSelector";
import { RDropdownMenu } from "../shared/menus/dropdown-menu";
import { Table } from "../shared/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AddPaymentMethod } from "./addPaymentMethod";
import { PaymentMethods } from "./payment-methods";

const stripePromise = loadStripe(environment.STRIPE_PUBLISHABLE_KEY!);

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
  const activeProject = useAppSelector(selectActiveProject);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  const tableData: TableData = {
    headers: ["Invoice Number", "Amount", "  Date  ", "Status"],
    body:
      activeProject?.invoices?.map((invoice) => ({
        invoicenumber: invoice.invoiceNumber,
        amount: `$${invoice.amount}`,
        date: "March 10,2024",
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
            {invoice.status}
          </p>
        ),
      })) || [],
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

  const fetchAndDispatchProjects = async () => {
    try {
      const response = await axios.get(
        `${environment.VITE_API_URL}/projects/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(setUserProjects(response.data?.projects));
        const currentProject = response.data.projects.find(
          (project: any) => project._id === activeProject?._id
        );
        dispatch(setActiveProject(currentProject));
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
    }
  };

  const handleDeletePaymentMethod = async (paymentMethodId: string) => {
    if (!token) {
      toast.error("User is not authenticated");
      return;
    }

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
            Authorization: `Bearer ${token}`,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-5 items-center">
          {activeProject?.paymentMethods?.map((item: any, index: number) => {
            const { brand, last4, exp_year, exp_month } =
              item.paymentMethod.card;

            const cardNumber = `${brand}****${last4}`;
            const expiry = `Expires ${exp_month}/${exp_year}`;
            const isDefault = item.paymentMethod.default || false;

            return (
              <PaymentMethods
                cardNumber={cardNumber}
                expiry={expiry}
                default={isDefault}
                key={index}
                onDelete={() => showDeletePopup(item._id)}
              />
            );
          })}

          <Elements stripe={stripePromise}>
            <AddPaymentMethod reFetch={fetchAndDispatchProjects} />
          </Elements>
        </div>
        <div className="justify-between items-center grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-3">
          <div className="flex flex-col">
            <h1 className="py-4 font-medium text-md">Coupon</h1>
            <Input
              placeholder="Enter your coupon code"
              className="rounded-sm"
            />
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
        <div className="flex flex-col h-full w-full gap-2 pt-4">
          <div className="flex text-gray-800 font-medium gap-1 items-center">
            <h1>Latest Invoices</h1>
          </div>
          <Table {...tableData} />
        </div>
      </div>
    </div>
  );
};
