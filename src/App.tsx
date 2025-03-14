// App.tsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import webfont from "webfontloader";
import ImpersonationBanner from "./components/shared/impersonation-banner";
import { useAppDispatch } from "./hooks/redux";
import { setAuthHeader } from "./lib/apiConfig";
import { useMeQuery } from "./redux/api/user-api";
import { loadUser } from "./redux/reducer/userSlice";
import { persistor } from "./redux/store";

export default function App() {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  const { data } = useMeQuery(
    { id: id!, token: token! },
    {
      skip: !id || !token,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    // Web Font Loader:
    webfont.load({
      google: {
        families: ["Inter:200,300,400,500,600,700,800"],
      },
    });

    if (token) {
      setAuthHeader(token);
    }

    if (data?.success) {
      dispatch(loadUser(data.user));
    }

    persistor
      .flush()
      .then(() => {
        console.log("State is flushed and saved!");
      })
      .catch((err) => {
        console.error("Error saving state:", err);
      });
  }, [data, dispatch]);

  return (
    <>
      <ImpersonationBanner />
      <Outlet />
    </>
  );
}
