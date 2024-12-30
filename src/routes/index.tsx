// Imports:
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import { ProtectedRoute } from "./protect-route";
import Team from "../pages/team";

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
    ],
  },
]);

export default router;
