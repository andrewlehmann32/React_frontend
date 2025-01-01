// Imports:
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout } from "../redux/reducer/user-reducer";

const ProtectedRoute = ({
  children,
  isAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { user, isAuth, isLoading } = useAppSelector(
    (state) => state["user-reducer"]
  );

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
    dispatch(logout());
    return <Navigate to="/" replace />;
  }

  return children;
};

export { ProtectedRoute };
