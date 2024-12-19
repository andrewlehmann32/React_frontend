// Imports:
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import ProtectRoute from "./protect-route";

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
        path: "/dashboard",
        element: (
          <ProtectRoute isAdmin={false}>
            <Dashboard />
          </ProtectRoute>
        ),
      },
    ],
  },
]);

export default router;
