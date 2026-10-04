import { translateContent } from "./i18n/translateContent";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import NotreEquipe from "./pages/NotreEquipe";
import DonationSuccess from "./pages/DonationSuccess";
import DonationCancel from "./pages/DonationCancel";
import { resolveRoute, type RouteName } from "./routing/routes";

const routeComponents = {
  home: Home,
  elimba: Elimba,
  support: Soutenir,
  library: Bibliotheque,
  manifestos: Manifestes,
  transmission: TransmissionMuntu,
  academy: AcademieMuntu,
  team: NotreEquipe,
  donationSuccess: DonationSuccess,
  donationCancel: DonationCancel,
  book: Home,
  manifesto: Home,
};

const defaultDescription =
  "Pour la Renaissance du Muntu — Une vision africaine de la renaissance de l'être humain, des peuples et de la civilisation.";

/** SEO minimal par route logique (title + meta description). */
const defaultPageMeta = {
  title: "Pour la Renaissance du Muntu",
  description: defaultDescription,
};

const pageMetaByRoute: Partial<Record<RouteName, { title: string; description: string }>> = {
  home: defaultPageMeta,
  elimba: {
    title: "Elimb'a Dikalo | Pour la Renaissance du Muntu",
    description:
      "Elimb'a Dikalo — Pilier fondateur du mouvement Pour la Renaissance du Muntu. Dialogue, responsabilité et écologie spirituelle des peuples.",
  },
  support: {
    title: "Soutenir | Pour la Renaissance du Muntu",
    description:
      "Soutenez Pour la Renaissance du Muntu : dons sécurisés, partenariats et engagement au service de la renaissance des consciences, des peuples et de la civilisation.",
  },
  library: {
    title: "Bibliothèque du Muntu | Pour la Renaissance du Muntu",
    description:
      "Bibliothèque du Muntu — Ouvrages, essais et manifestes qui portent la pensée, la culture et la vision du Muntu.",
  },
  manifestos: {
    title: "Manifestes | Bibliothèque du Muntu",
    description:
      "Manifestes fondateurs du projet Pour la Renaissance du Muntu — textes de conviction à lire, partager et transmettre.",
  },
  transmission: {
    title: "Transmission du Muntu | Pour la Renaissance du Muntu",
    description:
      "Transmission du Muntu — Pilier 3 du mouvement Pour la Renaissance du Muntu. Restaurer le MUNTU et activer le NTU : formations, ateliers, cercles de parole et mentorat.",
  },
  academy: {
    title: "Académie du Muntu | Pour la Renaissance du Muntu",
    description:
      "Académie du Muntu — Histoire, cosmologies, formation, décolonisation, reconstruction intérieure et leadership au service d’une nouvelle conscience africaine.",
  },
  team: {
    title: "Notre Équipe | Pour la Renaissance du Muntu",
    description:
      "Notre Équipe — Des femmes et des hommes engagés au service de la vision de Pour la Renaissance du Muntu : conscience collective, responsabilités partagées et renaissance des consciences, des peuples et de la civilisation.",
  },
  donationSuccess: {
    title: "Don reçu | Pour la Renaissance du Muntu",
    description:
      "Merci pour votre don à Pour la Renaissance du Muntu. La confirmation définitive du paiement est traitée par le système de paiement.",
  },
  donationCancel: {
    title: "Don non finalisé | Pour la Renaissance du Muntu",
    description:
      "Votre don n'a pas été finalisé. Vous pouvez revenir au parcours de don lorsque vous le souhaitez.",
  },
};

function App() {
  const { i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);
  const [pathname, setPathname] = useState(
    window?.location?.pathname ?? "/",
  );
  const route = resolveRoute(pathname);

  useEffect(() => {
    const onLanguageChange = (language: string) => setActiveLanguage(language);
    i18n.on("languageChanged", onLanguageChange);
    return () => {
      i18n.off("languageChanged", onLanguageChange);
    };
  }, [i18n]);

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

  useEffect(() => {
    void i18n.changeLanguage(route.language);
    document.documentElement.lang = route.language;
  }, [i18n, route.language]);

  /* Met à jour title / meta description (pages livre / manifeste gèrent leur propre titre). */
  useEffect(() => {
    if (route.name === "book" || route.name === "manifesto") return;
    const meta = pageMetaByRoute[route.name] ?? defaultPageMeta;
    document.title = translateContent(meta.title);
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", translateContent(meta.description));
  }, [pathname, route.name]);

  const content = (() => {
    if (route.name === "book") {
      return <ConsulterLivre id={route.param ?? ""} />;
    }
    if (route.name === "manifesto") {
      return <ManifestePage slug={route.param ?? ""} />;
    }
    const Page = routeComponents[route.name];
    return <Page />;
  })();

  return <MainLayout key={activeLanguage}>{translateContent(content)}</MainLayout>;
}

export default App;
