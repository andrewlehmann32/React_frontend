// Imports:
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../components/not-found";
import Activity from "../pages/activity-log";
import AdminClients from "../pages/admin-pages/clients";
import AdminDashboard from "../pages/admin-pages/dashboard";
import AdminOrders from "../pages/admin-pages/orders";
import AdminPlans from "../pages/admin-pages/plans";
import AdminProjects from "../pages/admin-pages/projects";
import AdminServers from "../pages/admin-pages/servers";
import Billing from "../pages/billing";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Ordering from "../pages/ordering";
import Resources from "../pages/resources";
import SSHkeys from "../pages/ssh-keys";
import Team from "../pages/team";
import VerifyInvite from "../pages/verify-invitation";
import OnlyAdmin from "./only-admin";
import ProtectedRoute from "./protected-route";

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
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/home",
        element: (
          <OnlyAdmin>
            <AdminDashboard />
          </OnlyAdmin>
        ),
      },
      {
        path: "/admin/projects",
        element: (
          <OnlyAdmin>
            <AdminProjects />
          </OnlyAdmin>
        ),
      },
      {
        path: "/admin/clients",
        element: (
          <OnlyAdmin>
            <AdminClients />
          </OnlyAdmin>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <OnlyAdmin>
            <AdminOrders />
          </OnlyAdmin>
        ),
      },
      {
        path: "/admin/plans",
        element: (
          <OnlyAdmin>
            <AdminPlans />
          </OnlyAdmin>
        ),
      },
      {
        path: "/admin/servers",
        element: (
          <OnlyAdmin>
            <AdminServers />
          </OnlyAdmin>
        ),
      },
      {
        path: "/team",
        element: (
          <ProtectedRoute>
            <Team />
          </ProtectedRoute>
        ),
      },
      {
        path: "/not-found",
        element: <NotFound />,
      },
      {
        path: "/ordering",
        element: (
          <ProtectedRoute>
            <Ordering />
          </ProtectedRoute>
        ),
      },
      {
        path: "/billing",
        element: (
          <ProtectedRoute>
            <Billing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/activity",
        element: (
          <ProtectedRoute>
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
          <ProtectedRoute>
            <SSHkeys />
          </ProtectedRoute>
        ),
      },
      {
        path: "/resources",
        element: (
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
