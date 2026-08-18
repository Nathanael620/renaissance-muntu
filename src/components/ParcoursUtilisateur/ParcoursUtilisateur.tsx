import {
  ArrowRight,
  BookOpen,
  Eye,
  Lightbulb,
  PenLine,
  Users,
  type LucideIcon,
} from "lucide-react";
import { parcours } from "../../data/siteData";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

const iconMap: Record<string, LucideIcon> = {
  Eye,
  Lightbulb,
  PenLine,
  BookOpen,
  Users,
};

/**
 * Le parcours du visiteur — 5 étapes (maquette)
 * Affiché en colonne à gauche, à côté de CitationFinale
 */
export default function ParcoursUtilisateur() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="parcours"
      ref={ref}
      className="flex h-full flex-col rounded-2xl border border-or/25 bg-creme-clair px-4 py-8 md:px-6 md:py-10"
      aria-labelledby="parcours-title"
    >
      <div className={cn("flex h-full flex-col", visible && "animate-fade-in")}>
        <h2
          id="parcours-title"
          className="mb-8 text-center font-serif text-lg font-semibold uppercase tracking-wide text-vert md:mb-10 md:text-xl lg:text-2xl"
        >
          Le parcours du visiteur
        </h2>

        <ol className="flex flex-1 flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center sm:gap-4 lg:flex-nowrap lg:justify-between lg:gap-2">
          {parcours.map((step, index) => {
            const Icon = iconMap[step.icon] ?? Eye;
            return (
              <li
                key={step.title}
                className="flex w-full max-w-[160px] flex-col items-center text-center sm:w-auto sm:max-w-[140px] lg:max-w-none lg:flex-1"
              >
                <div className="flex w-full items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-or/40 bg-[#c4a574] lg:h-16 lg:w-16">
                    <Icon className="h-6 w-6 text-vert lg:h-7 lg:w-7" aria-hidden />
                  </div>
                  {index < parcours.length - 1 && (
                    <ArrowRight
                      className="ml-1 hidden h-4 w-4 shrink-0 text-anthracite/40 lg:ml-2 lg:block"
                      aria-hidden
                    />
                  )}
                </div>
                <p className="mt-2.5 font-sans text-[10px] font-bold uppercase tracking-wide text-vert lg:text-[11px]">
                  {step.title}
                </p>
                <p className="mt-1 font-sans text-[10px] leading-snug text-anthracite/75 lg:text-[11px]">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 text-center font-sans text-xs italic text-anthracite/70 md:mt-auto md:pt-8 md:text-sm">
          Un Cheminement inspirant qui transforme la réflexion en action.
        </p>
      </div>
    </section>
  );
}
