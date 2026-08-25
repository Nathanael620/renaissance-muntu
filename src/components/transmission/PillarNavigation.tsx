import { ArrowRight } from "lucide-react";
import { pillars } from "../../data/siteData";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";
import { navigateTo } from "../../utils/navigate";

/**
 * Section 8 — Navigation vers les autres piliers.
 * La carte « Transmission du NTU » est signalée comme page active et
 * permet de comprendre que l'on demeure dans le même institut.
 */
const pillarTargets: Record<string, string> = {
  "renaissance-des-peuples": "/#piliers",
  elimba: "/elimba",
  "transmission-muntu": "/transmission-muntu",
  "academie-muntu": "/academie-muntu",
  "bibliotheque-muntu": "/bibliotheque",
};

export default function PillarNavigation() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="transmission-piliers"
      ref={ref}
      className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="transmission-piliers-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="hidden h-px flex-1 max-w-40 bg-or/60 sm:block" aria-hidden />
          <h2
            id="transmission-piliers-title"
            className="text-center font-serif text-xl font-semibold uppercase tracking-wide text-vert md:text-2xl"
          >
            Explorer les autres piliers
          </h2>
          <span className="hidden h-px flex-1 max-w-40 bg-or/60 sm:block" aria-hidden />
        </div>

        <div className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5", visible && "animate-fade-in")}>
          {pillars.map((pillar) => {
            const isActive = pillar.slug === "transmission-muntu";
            const href = pillarTargets[pillar.slug] ?? "#";
            return (
              <a
                key={pillar.id}
                href={href}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => navigateTo(event, href)}
                className={cn(
                  "group flex flex-col rounded-2xl border p-5 shadow-sm transition-all duration-300",
                  isActive
                    ? "border-or/60 bg-vert-profond text-white"
                    : "border-or/25 bg-creme-clair text-vert hover:border-or/60 hover:shadow-md",
                )}
              >
                <span
                  className={cn(
                    "font-serif text-sm font-semibold uppercase tracking-wide",
                    isActive ? "text-or-clair" : "text-or",
                  )}
                  aria-hidden
                >
                  {String(pillar.id).padStart(2, "0")}
                </span>
                <h3 className="mt-2 flex-1 font-serif text-sm font-bold uppercase leading-snug">
                  {pillar.title}
                </h3>
                <span
                  className={cn(
                    "mt-2 font-sans text-[11px] leading-relaxed",
                    isActive ? "text-white/80" : "text-anthracite/75",
                  )}
                >
                  {pillar.themes.join(" • ")}
                </span>
                <span
                  className={cn(
                    "mt-4 inline-flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-wide transition-transform duration-300 group-hover:translate-x-1",
                    isActive ? "text-or-clair" : "text-vert",
                  )}
                >
                  {isActive ? "Page actuelle" : "Découvrir"}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}