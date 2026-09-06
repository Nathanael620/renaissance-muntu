import {
  ArrowRight,
  Compass,
  Globe,
  GraduationCap,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { pillars } from "../../data/siteData";
import {
  equipeCompetencesTransverses,
  equipePillarTargets,
} from "../../data/equipeData";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";
import { navigateTo } from "../../utils/navigate";

/** Icônes associées aux cinq piliers officiels (aucun nouveau pilier). */
const pillarIcons: Record<string, LucideIcon> = {
  "renaissance-des-peuples": Globe,
  elimba: Users,
  "transmission-muntu": Star,
  "academie-muntu": GraduationCap,
  "bibliotheque-muntu": Compass,
};

/**
 * Section 5 — Domaines d'engagement de l'équipe.
 * Strictement aligné sur les cinq piliers officiels (DCFT §7).
 * Les compétences transverses sont exprimées hors piliers, comme capacités
 * humaines mobilisées par les membres.
 */
export default function EquipeDomaines() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="equipe-domaines"
      ref={ref}
      className="rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="equipe-domaines-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
            Champs d&rsquo;engagement
          </p>
          <h2
            id="equipe-domaines-title"
            className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
          >
            Les domaines d&rsquo;engagement de l&rsquo;équipe
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-anthracite/80 sm:text-base">
            L&rsquo;équipe se mobilise au service des cinq piliers du mouvement,
            dans une continuité institutionnelle constante.
          </p>
        </div>

        <ul
          className={cn(
            "mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-5",
            visible && "animate-fade-in-delay-1",
          )}
        >
          {pillars.map((pillar) => {
            const Icon = pillarIcons[pillar.slug] ?? Compass;
            const href = equipePillarTargets[pillar.slug] ?? "/#piliers";
            return (
              <li key={pillar.id}>
                <a
                  href={href}
                  onClick={(event) => navigateTo(event, href)}
                  className="group flex h-full flex-col rounded-[1.75rem] border border-or/25 bg-white p-6 shadow-sm transition-all duration-300 hover:border-or/60 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-vert/10 text-vert">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span
                      className="font-serif text-2xl font-semibold text-or/70"
                      aria-hidden
                    >
                      {String(pillar.id).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-sm font-bold uppercase leading-snug text-vert">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 flex-1 font-sans text-[13px] leading-relaxed text-anthracite/75">
                    {pillar.themes.join(" • ")}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-wide text-vert transition-transform duration-300 group-hover:translate-x-1">
                    Explorer
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 border-t border-or/20 pt-6 text-center font-sans text-xs uppercase tracking-[0.18em] text-anthracite/60">
          Compétences transverses de l&rsquo;équipe :{" "}
          {equipeCompetencesTransverses.join(" • ")}.
        </p>
      </div>
    </section>
  );
}