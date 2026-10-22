import { translateContent } from "./i18n/translateContent";
import { lazy, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import AdminRouteGuard from "./components/AdminRouteGuard";
import AdminUserProvider from "./components/AdminUserProvider";
import type { AdminUser } from "./services/adminService";
import { navigateToPath, resolveRoute, type RouteName } from "./routing/routes";

const Elimba = lazy(() => import("./pages/Elimba"));
const Soutenir = lazy(() => import("./pages/Soutenir"));
const Bibliotheque = lazy(() => import("./pages/Bibliotheque"));
const ConsulterLivre = lazy(() => import("./pages/ConsulterLivre"));
const Manifestes = lazy(() => import("./pages/Manifestes"));
const ManifestePage = lazy(() => import("./pages/ManifestePage"));
const TransmissionMuntu = lazy(() => import("./pages/TransmissionMuntu"));
const AcademieMuntu = lazy(() => import("./pages/AcademieMuntu"));
const NotreEquipe = lazy(() => import("./pages/NotreEquipe"));
const DonationSuccess = lazy(() => import("./pages/DonationSuccess"));
const DonationCancel = lazy(() => import("./pages/DonationCancel"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminInvitationPage = lazy(() => import("./pages/admin/AdminInvitationPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminMessagesPage = lazy(() => import("./pages/admin/AdminMessagesPage"));
const AdminPartnershipPage = lazy(() => import("./pages/admin/AdminPartnershipPage"));
const AdminLibraryPage = lazy(() => import("./pages/admin/AdminLibraryPage"));
const AdminAdministratorsPage = lazy(() => import("./pages/admin/AdminAdministratorsPage"));
const AdminSettingsPage = lazy(() => import("./pages/admin/AdminSettingsPage"));

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
  adminLogin: AdminLoginPage,
  adminInvitation: AdminInvitationPage,
  adminDashboard: AdminDashboardPage,
  adminMessages: AdminMessagesPage,
  adminPartnerships: AdminPartnershipPage,
  adminLibrary: AdminLibraryPage,
  adminAdministrators: AdminAdministratorsPage,
  adminSettings: AdminSettingsPage,
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
  adminLogin: {
    title: "Connexion | Administration",
    description: "Espace sécurisé d'administration de la Renaissance du Muntu.",
  },
  adminInvitation: {
    title: "Activation du compte | Administration",
    description: "Activation d’un compte invité à l’administration de la Renaissance du Muntu.",
  },
  adminDashboard: {
    title: "Tableau de bord | Administration",
    description: "Vue d'ensemble de l'administration de la Renaissance du Muntu.",
  },
  adminMessages: {
    title: "Messages | Administration",
    description: "Gestion des messages et demandes reçues par la Renaissance du Muntu.",
  },
  adminPartnerships: {
    title: "Partenariats | Administration",
    description: "Suivi des demandes de partenariat et collaborations institutionnelles.",
  },
  adminLibrary: {
    title: "Bibliothèque | Administration",
    description: "Gestion des ressources et contenus de la bibliothèque du Muntu.",
  },
  adminAdministrators: {
    title: "Administrateurs | Administration",
    description: "Gestion des comptes d'administration de la Renaissance du Muntu.",
  },
  adminSettings: {
    title: "Paramètres | Administration",
    description: "Paramètres du profil administrateur et préférences de l'interface.",
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
    const onAdminSessionExpired = () => {
      const currentRoute = resolveRoute(window.location.pathname).name;
      if ([
        "adminDashboard",
        "adminMessages",
        "adminPartnerships",
        "adminLibrary",
        "adminAdministrators",
        "adminSettings",
      ].includes(currentRoute)) {
        navigateToPath("/admin/connexion");
      }
    };
    window.addEventListener("popstate", onRouteChange);
    window.addEventListener("routechange", onRouteChange);
    window.addEventListener("admin-session-expired", onAdminSessionExpired);
    return () => {
      window.removeEventListener("popstate", onRouteChange);
      window.removeEventListener("routechange", onRouteChange);
      window.removeEventListener("admin-session-expired", onAdminSessionExpired);
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

  const isAdminRoute = [
    "adminDashboard",
    "adminMessages",
    "adminPartnerships",
    "adminLibrary",
    "adminAdministrators",
    "adminSettings",
  ].includes(route.name);
  const pageLoadingFallback = (
    <div role="status" aria-live="polite" className="px-6 py-12 text-center">
      {translateContent("Chargement...")}
    </div>
  );

  if (route.name === "adminLogin" || route.name === "adminInvitation") {
    return (
      <Suspense fallback={pageLoadingFallback}>
        {translateContent(content)}
      </Suspense>
    );
  }

  if (isAdminRoute) {
    const permissions: Partial<Record<RouteName, string>> = {
      adminDashboard: "dashboard.view",
      adminMessages: "messages.view",
      adminPartnerships: "partnerships.view",
      adminLibrary: "resources.view",
      adminAdministrators: "admins.manage",
      adminSettings: "profile.manage",
    };

    return (
      <AdminRouteGuard permission={permissions[route.name] ?? "dashboard.view"}>
        {(user: AdminUser) => (
          <AdminUserProvider user={user}>
            <AdminLayout key={activeLanguage}>
              <Suspense fallback={pageLoadingFallback}>
                {translateContent(content)}
              </Suspense>
            </AdminLayout>
          </AdminUserProvider>
        )}
      </AdminRouteGuard>
    );
  }

  return (
    <MainLayout key={activeLanguage}>
      <Suspense fallback={pageLoadingFallback}>
        {translateContent(content)}
      </Suspense>
    </MainLayout>
  );
}

export default App;
