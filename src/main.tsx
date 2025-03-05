// Imports:
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./lib/firebase";
import { store } from "./redux/store";
import router from "./routes";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    {/* <NotifyPopup /> */}
    <Toaster />
  </Provider>
);
