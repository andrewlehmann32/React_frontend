import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { environment } from "../../config/environment";

const VerifyInvite = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyInvite = async () => {
      try {
        const token = searchParams.get("token");
        const projectId = searchParams.get("projectId");
        const inviteLink = `${environment.VITE_API_URL}/api/v1/members/verify-invite?token=${token}&projectId=${projectId}`;

        const response = await axios.get(inviteLink, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setMessage("You have been verified and added to the team.");
        } else {
          setMessage("Failed to verify invite. Please try again.");
        }
      } catch (error) {
        setMessage(
          "An error occurred while verifying your invite. Please contact support."
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    verifyInvite();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="message text-center text-lg font-bold">{message}</div>
      )}
    </div>
  );
};

export default VerifyInvite;
