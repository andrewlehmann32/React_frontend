// // Imports:
// import { Navigate } from "react-router-dom";
// import AppLayout from "../components/layouts/appLayout";
// import { useAppSelector } from "../hooks/redux";
// import { selectUser } from "../redux/selectors/userSelector";

// const ProtectedRoute = ({
//   children,
//   isAdmin = false,
// }: {
//   children: React.ReactNode;
//   isAdmin?: boolean;
// }) => {
//   // const dispatch = useAppDispatch();
//   const { user, isAuth, isLoading } = useAppSelector(selectUser);

//   if (user?.role !== "admin" && isAdmin) {
//     // dispatch(logout());
//     return <Navigate to="/home" replace />;
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (
//     !user ||
//     !localStorage.getItem("token") ||
//     !localStorage.getItem("id") ||
//     !isAuth
//   ) {
//     return <Navigate to="/" replace />;
//   }

//   return <AppLayout>{children}</AppLayout>;
// };

// // export { ProtectedRoute };
