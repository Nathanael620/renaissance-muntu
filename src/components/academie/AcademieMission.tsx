import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 3 — Notre mission.
 * Bloc éditorial : l'idée-force « devenir ambassadeur de solution ».
 */
const raisons = [
  "comprendre leur histoire",
  "renforcer leur conscience",
  "développer leur esprit critique",
  "valoriser leur culture",
  "comprendre les mécanismes de dévalorisation",
  "participer à la transformation de leur société",
];

export default function AcademieMission() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="academie-mission"
      ref={ref}
      className="rounded-[2rem] border border-or/25 bg-vert-profond/95 px-6 py-12 text-white shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="academie-mission-title"
    >
      <div className={cn("mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center", visible && "animate-fade-in-delay-1")}>
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-or-clair">
            Notre mission
          </p>
          <h2
            id="academie-mission-title"
            className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-white sm:text-4xl"
          >
            Devenir un ambassadeur de solution
          </h2>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
            L&rsquo;objectif est de permettre aux jeunes de&nbsp;:
          </p>

          <ul className="mt-6 space-y-3">
            {raisons.map((raison) => (
              <li key={raison} className="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-white/90">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
                {raison}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-or/20 bg-creme p-6 shadow-sm">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-or-fonce">
              Un objectif clair
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-anthracite/90">
              Faire de la connaissance, de l&rsquo;histoire et de la conscience des outils
              de renaissance au service d&rsquo;une jeunesse africaine fière de son ancrage.
            </p>
          </div>
          <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-or-clair">
            Et concrètement
          </p>
          <ul className="mt-2 space-y-1.5">
            {["formations", "ateliers", "conférences", "communauté en ligne"].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-or/70" aria-hidden />
                <span className="font-sans text-sm leading-relaxed text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}