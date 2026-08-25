import { ArrowRight } from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 5 — Les transformations recherchées.
 * Visualisation pédagogique de la progression intérieur → conscience
 * → relation → autonomie → action → durabilité.
 */
const etapes = [
  { etape: "Intérieur", effet: "Réconciliation avec soi" },
  { etape: "Conscience", effet: "Équilibre et lucidité" },
  { etape: "Relation", effet: "Réparation collective" },
  { etape: "Autonomie", effet: "Autonomie intellectuelle" },
  { etape: "Action", effet: "Passage de la conscience à l’action" },
  { etape: "Durabilité", effet: "Durabilité" },
];

export default function TransformationSection() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="transmission-transformations"
      ref={ref}
      className="rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="transmission-transformations-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Les résultats visés
        </p>
        <h2
          id="transmission-transformations-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Les transformations recherchées
        </h2>

        <div className={cn("mt-10 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center", visible && "animate-fade-in-delay-1")}>
          <div className="space-y-5 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
            <p>
              Chaque axe de transmission vise un basculement durable&nbsp;: de la
              réparation intérieure jusqu&rsquo;à la capacité de transmettre et de durer.
            </p>
            <p>
              Ces étapes ne sont pas des injonctions&nbsp;: elles décrivent le cheminement
              qu&rsquo;un accompagnement attentif cherche à rendre possible pour chaque
              personne.
            </p>
          </div>

          <ol className="space-y-4" aria-label="Progression des transformations">
            {etapes.map((etape, index) => (
              <li key={etape.etape} className="relative flex items-center gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-vert text-creme font-serif text-base font-semibold"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <div className="flex flex-1 items-start gap-3 rounded-[1.5rem] border border-vert/20 bg-creme p-4 shadow-sm">
                  <h3 className="font-serif text-base font-semibold uppercase text-vert">
                    {etape.etape}
                  </h3>
                  <span className="mt-0 text-vert/50" aria-hidden>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <p className="font-sans text-sm italic text-or-fonce">
                    {etape.effet}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}