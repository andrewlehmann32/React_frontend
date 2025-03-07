// Imports:
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Activity from "../pages/activity-log";
import AdminClients from "../pages/admin-clients";
import AdminDashboard from "../pages/admin-dashboard";
import AdminOrders from "../pages/admin-orders";
import AdminPlans from "../pages/admin-plans";
import AdminProjects from "../pages/admin-projects";
import Billing from "../pages/billing";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Ordering from "../pages/ordering";
import Resources from "../pages/resources";
import SSHkeys from "../pages/ssh-keys";
import Team from "../pages/team";
import VerifyInvite from "../pages/verify-invitation";
import { ProtectedRoute } from "./protect-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute isAdmin={false}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/home",
        element: (
          <ProtectedRoute isAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/projects",
        element: (
          <ProtectedRoute isAdmin={true}>
            <AdminProjects />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/clients",
        element: (
          <ProtectedRoute isAdmin={true}>
            <AdminClients />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <ProtectedRoute isAdmin={true}>
            <AdminOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/plans",
        element: (
          <ProtectedRoute isAdmin={true}>
            <AdminPlans />
          </ProtectedRoute>
        ),
      },
      {
        path: "/team",
        element: (
          <ProtectedRoute isAdmin={false}>
            <Team />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ordering",
        element: (
          <ProtectedRoute isAdmin={false}>
            <Ordering />
          </ProtectedRoute>
        ),
      },
      {
        path: "/billing",
        element: (
          <ProtectedRoute isAdmin={false}>
            <Billing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/activity",
        element: (
          <ProtectedRoute isAdmin={false}>
            <Activity />
          </ProtectedRoute>
        ),
      },
      {
        path: "/verify-invite",
        element: <VerifyInvite />,
      },
      {
        path: "/sshkeys",
        element: (
          <ProtectedRoute isAdmin={false}>
            <SSHkeys />
          </ProtectedRoute>
        ),
      },
      {
        path: "/resources",
        element: (
          <ProtectedRoute isAdmin={false}>
            <Resources />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
