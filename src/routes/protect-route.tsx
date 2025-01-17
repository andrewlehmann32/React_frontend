// Imports:
import { Navigate } from "react-router-dom";
import AppLayout from "../components/layouts/appLayout";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout } from "../redux/reducer/userSlice";
import { selectUser } from "../redux/selectors/userSelector";

const ProtectedRoute = ({
  children,
  isAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { user, isAuth, isLoading } = useAppSelector(selectUser);

  if (user?.role !== "admin" && isAdmin) {
    dispatch(logout());
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (
    !user ||
    !localStorage.getItem("token") ||
    !localStorage.getItem("id") ||
    !isAuth
  ) {
    return <Navigate to="/" replace />;
  }

  return <AppLayout>{children}</AppLayout>;
};

export { ProtectedRoute };
