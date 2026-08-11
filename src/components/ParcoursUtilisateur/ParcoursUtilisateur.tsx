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
 */
export default function ParcoursUtilisateur() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="parcours"
      ref={ref}
      className="bg-creme px-4 py-14 md:px-8 md:py-16 lg:px-10"
      aria-labelledby="parcours-title"
    >
      <div className={cn("mx-auto max-w-[1440px]", visible && "animate-fade-in")}>
        <h2
          id="parcours-title"
          className="mb-10 text-center font-serif text-xl font-semibold uppercase tracking-wide text-vert md:mb-14 md:text-2xl lg:text-3xl"
        >
          Le parcours du visiteur
        </h2>

        <ol className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between md:gap-2 lg:gap-4">
          {parcours.map((step, index) => {
            const Icon = iconMap[step.icon] ?? Eye;
            return (
              <li key={step.title} className="flex w-full max-w-[180px] flex-col items-center text-center md:max-w-none md:flex-1">
                <div className="flex w-full items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-or/40 bg-[#c4a574]/md:h-[4.5rem] md:w-[4.5rem]">
                    <Icon className="h-7 w-7 text-vert" aria-hidden />
                  </div>
                  {index < parcours.length - 1 && (
                    <ArrowRight
                      className="ml-2 hidden h-5 w-5 shrink-0 text-anthracite/40 md:block lg:ml-4"
                      aria-hidden
                    />
                  )}
                </div>
                <p className="mt-3 font-sans text-xs font-bold uppercase tracking-wide text-vert md:text-[11px] lg:text-xs">
                  {step.title}
                </p>
                <p className="mt-1 font-sans text-[11px] leading-snug text-anthracite/75">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        <p className="mt-10 text-center font-sans text-sm italic text-anthracite/70">
          Un mouvement inspirant qui transforme la réflexion en action.
        </p>
      </div>
    </section>
  );
}
