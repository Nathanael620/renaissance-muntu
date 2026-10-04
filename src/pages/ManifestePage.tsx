import { translateContent } from "../i18n/translateContent";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { ManifestoReader } from "../components/manifestes";
import { getManifestoBySlug } from "../data/manifestesData";
import { localizedPath, navigateToPath } from "../routing/routes";

/** Navigation interne maison (pushState + routechange). */
function navigate(href: string) {
  navigateToPath(href);
}

/**
 * Page de lecture d'un manifeste — /manifestes/:slug
 * Le lecteur est générique et piloté par les données du manifeste.
 */
export default function ManifestePage({ slug }: { slug: string }) {
  const { i18n } = useTranslation();
  const manifesto = getManifestoBySlug(slug);

  useEffect(() => {
    if (manifesto) {
      document.title = `${translateContent(manifesto.title)} — ${translateContent("Bibliothèque du Muntu")}`;
    }
  }, [i18n.language, manifesto]);

  if (!manifesto) {
    return (
      <div className="px-4 py-32 text-center md:px-8 lg:px-10">
        <p className="font-serif text-2xl font-semibold uppercase tracking-wide text-vert">
          {translateContent("Manifeste introuvable ")}</p>
        <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-anthracite/85">
          {translateContent("Ce manifeste n’existe pas ou n’est pas encore publié. ")}</p>
        <a
          href={localizedPath("/manifestes#nos-manifestes")}
          onClick={(event) => {
            event.preventDefault();
            navigate("/manifestes#nos-manifestes");
            /* Cible la section « Nos manifestes » après le rendu de la page. */
            setTimeout(() => {
              const el = document.getElementById("nos-manifestes");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 80);
          }}
          className="btn-or mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wide shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {translateContent("Retour aux manifestes ")}</a>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 py-12 md:px-8 lg:px-10">
      <ManifestoReader manifesto={manifesto} />
    </div>
  );
}