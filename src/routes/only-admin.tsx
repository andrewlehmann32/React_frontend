import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/appLayout";

const OnlyAdmin = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = () => {
      const role = localStorage.getItem("userRole");
      const isAdmin = role === "admin";
      setAdmin(isAdmin);

      if (role) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/");
      }

      setLoading(false);
    };
    checkUserRole();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="mx-auto text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!isLoggedIn || !admin) {
    navigate("/not-found", { replace: true });
  }

  if (!isLoggedIn || !admin) {
    return null;
  }

  return <AppLayout>{children}</AppLayout>;
};

export default OnlyAdmin;
