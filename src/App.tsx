import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Elimba from "./pages/Elimba";
import Soutenir from "./pages/Soutenir";
import Bibliotheque from "./pages/Bibliotheque";
import ConsulterLivre from "./pages/ConsulterLivre";
import Manifestes from "./pages/Manifestes";
import ManifestePage from "./pages/ManifestePage";
import TransmissionMuntu from "./pages/TransmissionMuntu";
import AcademieMuntu from "./pages/AcademieMuntu";

const routeMap = {
  "/": <Home />,
  "/elimba": <Elimba />,
  "/soutenir": <Soutenir />,
  "/bibliotheque": <Bibliotheque />,
  "/manifestes": <Manifestes />,
  "/transmission-muntu": <TransmissionMuntu />,
  "/academie-muntu": <AcademieMuntu />,
};

const defaultDescription =
  "Pour la Renaissance du Muntu — Une vision africaine de la renaissance de l'être humain, des peuples et de la civilisation.";

/** SEO minimal par route (title + meta description). */
const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Pour la Renaissance du Muntu",
    description: defaultDescription,
  },
  "/transmission-muntu": {
    title: "Transmission du Muntu | Pour la Renaissance du Muntu",
    description:
      "Transmission du Muntu — Pilier 3 du mouvement Pour la Renaissance du Muntu. Restaurer le MUNTU et activer le NTU : formations, ateliers, cercles de parole et mentorat.",
  },
  "/academie-muntu": {
    title: "Académie du Muntu | Pour la Renaissance du Muntu",
    description:
      "Académie du Muntu — Histoire, cosmologies, formation, décolonisation, reconstruction intérieure et leadership au service d’une nouvelle conscience africaine.",
  },
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

  /* Met à jour title / meta description pour les pages dédiées */
  useEffect(() => {
    const meta = pageMeta[pathname] ?? {
      title: "Pour la Renaissance du Muntu",
      description: defaultDescription,
    };
    document.title = meta.title;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", meta.description);
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
