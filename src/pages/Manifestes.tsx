import { ArrowLeft } from "lucide-react";
import { ManifestoCard } from "../components/manifestes";
import { manifestes } from "../data/manifestesData";
import { useFadeIn } from "../hooks/useFadeIn";
import { cn } from "../utils/cn";

/** Navigation interne maison (pushState + routechange). */
function navigate(href: string) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new Event("routechange"));
}

/**
 * Page « MANIFESTES » — /manifestes
 * Espace consacré aux textes fondateurs, aux réflexions et aux engagements
 * du projet. Catalogue généré depuis `manifestesData.ts`.
 */
export default function Manifestes() {
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  return (
    <div className="space-y-14 px-4 py-20 md:px-8 lg:px-10">
      {/* ——— Héro ——— */}
      <section
        id="manifestes-hero"
        className="relative -mx-4 md:-mx-8 lg:-mx-10 -mt-20 md:-mt-24 lg:-mt-28 z-0 overflow-hidden bg-vert-fonce text-white shadow-2xl"
        aria-labelledby="manifestes-hero-title"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, #d4a84b 0%, transparent 40%), radial-gradient(circle at 85% 80%, #f5f1e6 0%, transparent 35%)",
          }}
        />
        <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:py-28 lg:px-10 lg:py-32">
          <a
            href="/bibliotheque"
            onClick={(event) => {
              event.preventDefault();
              navigate("/bibliotheque");
            }}
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wide text-or-clair transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour à la bibliothèque
          </a>

          <p className="mt-10 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
            Bibliothèque du Muntu
          </p>

          <h1
            id="manifestes-hero-title"
            className="mt-5 font-serif text-4xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl"
          >
            Manifestes
          </h1>

          <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
            Cet espace rassemble les textes fondateurs du projet : des engagements
            de conviction, des refus assumés et des horizons partagés — pensés pour
            être lus, diffusés et transmis.
          </p>
        </div>
      </section>

      {/* ——— Nos manifestes ——— */}
      <section
        id="nos-manifestes"
        className="scroll-mt-24 rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
        aria-labelledby="nos-manifestes-title"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex items-center justify-center gap-4 md:mb-12">
            <span className="hidden h-px flex-1 max-w-40 bg-or/60 sm:block" aria-hidden />
            <h2
              id="nos-manifestes-title"
              className="text-center font-serif text-2xl font-semibold uppercase tracking-wide text-vert md:text-3xl"
            >
              Nos manifestes
            </h2>
            <span className="hidden h-px flex-1 max-w-40 bg-or/60 sm:block" aria-hidden />
          </div>

          <div
            ref={ref}
            className={cn(
              "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8",
              visible && "animate-fade-in",
            )}
          >
            {manifestes.length > 0 ? (
              manifestes.map((manifesto, index) => (
                <ManifestoCard
                  key={manifesto.slug}
                  manifesto={manifesto}
                  index={index}
                />
              ))
            ) : (
              <p className="col-span-full text-center font-sans text-sm text-anthracite/70">
                La collection de manifestes sera bientôt disponible.
              </p>
            )}
          </div>

          <a
            href="/bibliotheque"
            onClick={(event) => {
              event.preventDefault();
              navigate("/bibliotheque");
            }}
            className="mt-10 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wide text-vert transition-colors hover:text-or focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour à la bibliothèque
          </a>
        </div>
      </section>
    </div>
  );
}