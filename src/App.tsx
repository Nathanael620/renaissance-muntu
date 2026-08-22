import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Elimba from "./pages/Elimba";
import Soutenir from "./pages/Soutenir";
import Bibliotheque from "./pages/Bibliotheque";
import ConsulterLivre from "./pages/ConsulterLivre";
import Manifestes from "./pages/Manifestes";
import ManifestePage from "./pages/ManifestePage";

const routeMap = {
  "/": <Home />,
  "/elimba": <Elimba />,
  "/soutenir": <Soutenir />,
  "/bibliotheque": <Bibliotheque />,
  "/manifestes": <Manifestes />,
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

  /* Retour en haut de page à chaque changement de route */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const content = (() => {
    if (pathname.startsWith("/bibliotheque/consulter/")) {
      const id = decodeURIComponent(
        pathname.slice("/bibliotheque/consulter/".length),
      );
      return <ConsulterLivre id={id} />;
    }
    if (pathname.startsWith("/manifestes/")) {
      const slug = decodeURIComponent(pathname.slice("/manifestes/".length));
      return <ManifestePage slug={slug} />;
    }
    return routeMap[pathname as keyof typeof routeMap] ?? routeMap["/"];
  })();

  return <MainLayout>{content}</MainLayout>;
}

export default App;
