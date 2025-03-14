import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { environment } from "../../config/environment";
import { useAppSelector } from "../../hooks/redux";
import axios from "../../lib/apiConfig";
import { selectActiveProject } from "../../redux/selectors/userSelector";
import { Modal } from "../shared/popups/modal-box";
import { Button } from "../ui/button";
import { AddPaymentForm } from "./addPaymentForm";

const AddPaymentMethod = ({ reFetch }: { reFetch: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const activeProject = useAppSelector(selectActiveProject);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddPayment = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const { addressLine1, addressLine2, city, country, name, state, zipCode } =
      userData;

    if (!stripe || !elements) {
      toast.error("Stripe or elements not loaded");
      setIsLoading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      toast.error("Stripe elements not found");
      setIsLoading(false);
      return;
    }

    if (!name || !addressLine1 || !city || !state || !country || !zipCode) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: {
          name: name,
          address: {
            line1: addressLine1,
            line2: addressLine2,
            city: city,
            state: state,
            country: country,
            postal_code: zipCode,
          },
        },
      });

      if (error) {
        toast.error(error.message || "Error creating payment method");
        setIsLoading(false);
        return;
      }

      if (paymentMethod) {
        const response = await axios.post(
          `${environment.VITE_API_URL}/projects/payment-method`,
          {
            paymentMethod,
            projectId: activeProject?._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          toast.success("Payment method created and linked successfully");
          reFetch();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the payment method");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>+ Add new method</Button>
      <Modal
        title="Add Payment Method"
        actionButtonStyles="w-full border"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        button={false}
      >
        <AddPaymentForm
          userData={userData}
          handleInputChange={handleInputChange}
          onSave={handleAddPayment}
          loading={isLoading}
        />
      </Modal>
    </div>
  );
};

export { AddPaymentMethod };
