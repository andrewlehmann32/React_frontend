// Imports:
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import webfont from "webfontloader";

export default function App() {
  useEffect(() => {
    // Web Font Loader:
    webfont.load({
      google: {
        families: ["Inter:200,300,400,500,600,700,800"],
      },
    });
  }, []);

  return <Outlet />;
}
