import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { environment } from "../../../config/environment";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!userId) return;

        const response = await axios.post(
          `${environment.VITE_API_URL}/user/verify-email?userId=${userId}`
        );

        if (response.status === 200) {
          toast.success(response.data.message || "Email Verified");
          navigate("/", { replace: true });
        }
      } catch (error: unknown) {
        const message =
          axios.isAxiosError(error) && error.response
            ? error.response.data.message
            : "Something went wrong";
        toast.error(message);
      }
    };

    verifyEmail();
  }, [userId, navigate]);

  return (
    <div className="w-full items-center justify-center h-screen flex ">
      <p className=" text-center">Loading....</p>
    </div>
  );
};

export default VerifyEmail;
