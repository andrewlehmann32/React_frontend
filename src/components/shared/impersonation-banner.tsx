import { useNavigate } from "react-router-dom";
import { environment } from "../../config/environment";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearImpersonationToken } from "../../redux/reducer/userSlice";
import { selectImpersonationToken } from "../../redux/selectors/userSelector";
import axios from "./../../lib/apiConfig";

const ImpersonationBanner = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const impersonationToken = useAppSelector(selectImpersonationToken);

  const stopImpersonation = async () => {
    try {
      const response = await axios.post(
        `${environment.VITE_API_URL}/admin/stop-impersonation`
      );

      const { originalToken } = response.data;

      localStorage.setItem("token", originalToken);
      localStorage.removeItem("impersonationToken");

      dispatch(clearImpersonationToken());
      navigate("/admin/home");
      window.location.reload();
    } catch (error) {
      console.error("Error stopping impersonation:", error);
    }
  };

  return (
    impersonationToken && (
      <div className="fixed bottom-0  left-[35%] border border-dashed border-yellow-500 text-center bg-white p-2 justify-around items-center flex z-50 shadow-lg w-full sm:w-[23rem] mb-6 rounded-md">
        <p className="font-semibold">You are impersonating a user</p>
        <button
          onClick={stopImpersonation}
          className="ml-4 bg-red-600 text-white px-5 py-1 rounded hover:bg-red-700 font-medium"
        >
          Stop
        </button>
      </div>
    )
  );
};

export default ImpersonationBanner;
