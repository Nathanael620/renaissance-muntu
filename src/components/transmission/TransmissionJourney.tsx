import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Handshake,
  Heart,
  Lightbulb,
  PenLine,
  Target,
  type LucideIcon,
} from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 6 — Le parcours de transmission.
 * Représentation UX de la philosophie du pilier (et non un programme officiel).
 */
const parcours: { titre: string; detail: string; icone: LucideIcon }[] = [
  {
    titre: "Écouter",
    detail: "Recevoir la parole, le vécu et la mémoire de l’autre.",
    icone: Heart,
  },
  {
    titre: "Comprendre",
    detail: "Donner du sens, situer, relier le vécu à l’histoire.",
    icone: Lightbulb,
  },
  {
    titre: "Se recentrer",
    detail: "Retrouver une intériorité stable, discerner sans réagir.",
    icone: Target,
  },
  {
    titre: "Transmettre",
    detail: "Partager les valeurs, l’expérience et la parole reçues.",
    icone: BookOpen,
  },
  {
    titre: "S’engager",
    detail: "Passer de la conscience à l’action, individuellement et collectivement.",
    icone: PenLine,
  },
  {
    titre: "Accompagner",
    detail: "Devenir mentor et maillon d’une chaîne qui se poursuit.",
    icone: Handshake,
  },
];

export default function TransmissionJourney() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="transmission-parcours"
      ref={ref}
      className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="transmission-parcours-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Le cheminement proposé
        </p>
        <h2
          id="transmission-parcours-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Écouter, comprendre, transmettre.
        </h2>

        <div className={cn("mt-8 flex flex-col items-center gap-5 lg:flex-row lg:items-stretch lg:gap-3", visible && "animate-fade-in-delay-1")}>
          {parcours.map((etape, index) => {
            const Icon = etape.icone;
            const last = index === parcours.length - 1;
            return (
              <div key={etape.titre} className="flex w-full max-w-[320px] flex-col items-center text-center lg:max-w-none lg:flex-1">
                <div className="flex w-full items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-or/50 bg-vert/10">
                    <Icon className="h-6 w-6 text-vert" aria-hidden />
                  </div>
                  {!last && (
                    <>
                      <ArrowRight className="ml-2 hidden h-4 w-4 shrink-0 text-anthracite/40 lg:block" aria-hidden />
                      <ArrowDown className="ml-2 h-4 w-4 shrink-0 text-anthracite/40 lg:hidden" aria-hidden />
                    </>
                  )}
                </div>
                <p className="mt-3 font-sans text-xs font-bold uppercase tracking-wide text-vert">
                  {index + 1}. {etape.titre}
                </p>
                <p className="mt-1.5 font-sans text-xs leading-relaxed text-anthracite/75">
                  {etape.detail}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center font-sans text-xs italic text-anthracite/70 md:text-sm">
          Une représentation du cheminement porté par le pilier — le programme officiel
          et ses modalités seront précisés par l&rsquo;Institut.
        </p>
      </div>
    </section>
  );
}