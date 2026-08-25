import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { ManifestoReader } from "../components/manifestes";
import { getManifestoBySlug } from "../data/manifestesData";

/** Navigation interne maison (pushState + routechange). */
function navigate(href: string) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new Event("routechange"));
}

/**
 * Page de lecture d'un manifeste — /manifestes/:slug
 * Le lecteur est générique et piloté par les données du manifeste.
 */
export default function ManifestePage({ slug }: { slug: string }) {
  const manifesto = getManifestoBySlug(slug);

  useEffect(() => {
    if (manifesto) {
      document.title = `${manifesto.title} — Bibliothèque du Muntu`;
    }
  }, [manifesto]);

  if (!manifesto) {
    return (
      <div className="px-4 py-32 text-center md:px-8 lg:px-10">
        <p className="font-serif text-2xl font-semibold uppercase tracking-wide text-vert">
          Manifeste introuvable
        </p>
        <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-anthracite/85">
          Ce manifeste n’existe pas ou n’est pas encore publié.
        </p>
        <a
          href="/manifestes"
          onClick={(event) => {
            event.preventDefault();
            navigate("/manifestes");
          }}
          className="btn-or mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wide shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Retour aux manifestes
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 py-12 md:px-8 lg:px-10">
      <ManifestoReader manifesto={manifesto} />
    </div>
  );
}