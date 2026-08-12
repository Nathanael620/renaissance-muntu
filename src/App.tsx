import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Elimba from "./pages/Elimba";

const routeMap = {
  "/": <Home />,
  "/elimba": <Elimba />,
};

function App() {
  const [pathname, setPathname] = useState(
    window?.location?.pathname ?? "/",
  );

  useEffect(() => {
    const onRouteChange = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onRouteChange);
    window.addEventListener("routechange", onRouteChange);
    return () => {
      window.removeEventListener("popstate", onRouteChange);
      window.removeEventListener("routechange", onRouteChange);
    };
  }, []);

  const content = routeMap[pathname as keyof typeof routeMap] ?? routeMap["/"];

  return <MainLayout>{content}</MainLayout>;
}

export default App;
