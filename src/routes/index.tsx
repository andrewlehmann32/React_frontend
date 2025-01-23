// Imports:
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Activity from "../pages/activity-log";
import Billing from "../pages/billing";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Ordering from "../pages/ordering";
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
        element: (
          <ProtectedRoute isAdmin={false}>
            <VerifyInvite />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sshkeys",
        element: (
          <ProtectedRoute isAdmin={false}>
            <SSHkeys />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
