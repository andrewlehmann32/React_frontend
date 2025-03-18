import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/appLayout";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const role = localStorage.getItem("userRole");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = () => {
      const userToken = localStorage.getItem("token");

      if (userToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/");
      }
    };
    checkUserRole();
  }, [navigate]);

  if (role !== "user") {
    navigate("/not-found", { replace: true });
  }

  if (!isLoggedIn || role !== "user") {
    return null;
  }

  return <AppLayout>{children}</AppLayout>;
};

export default ProtectedRoute;
