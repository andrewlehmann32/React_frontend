// App.tsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import webfont from "webfontloader";
import ImpersonationBanner from "./components/shared/impersonation-banner";
import { useAppDispatch } from "./hooks/redux";
import { useMeQuery } from "./redux/api/user-api";
import { loadUser } from "./redux/reducer/userSlice";

export default function App() {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  const { data } = useMeQuery(
    { id: id!, token: token! },
    {
      skip: !token || !id,
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

    if (data?.success) {
      dispatch(loadUser(data.user));
    }
  }, [data, dispatch]);

  return (
    <>
      <ImpersonationBanner />
      <Outlet />
    </>
  );
}
