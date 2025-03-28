import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { environment } from "../../../config/environment";
import { ResetPasswordProvider } from "../../../contexts/auth";
import { PasswordResetForm } from "../login/forms";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const onConfirm = async (value: any) => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${environment.VITE_API_URL}/user/reset-password`,
        { password: value.password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Password has been reset");
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

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border min-h-1/2 rounded-md py-8 px-4 h-[25rem] flex flex-col gap-8">
        <h1 className="font-medium text-center text-xl ">
          Reset Your Password
        </h1>
        <div className="p-8">
          <ResetPasswordProvider>
            <PasswordResetForm onConfirm={onConfirm} />
          </ResetPasswordProvider>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
