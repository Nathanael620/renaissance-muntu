import { ArrowDown, ChevronDown } from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 5 — Programme Académie Muntu.
 * Partie I : fondements historiques et philosophiques de la crise identitaire africaine.
 * Timeline verticale + accordéons par module.
 * Le contenu respecte fidèlement les formulations du document.
 */
type Point = { nom: string; detail: string };
type Module = { numero: string; titre: string; points: Point[] };

const modules: Module[] = [
  {
    numero: "01",
    titre: "Les racines coloniales de la désorientation culturelle",
    points: [
      {
        nom: "L’entreprise de dévalorisation culturelle",
        detail:
          "Fanon, Césaire, l’école coloniale comme outil d’aliénation, Ngũgĩ wa Thiong’o, la falsification de l’histoire africaine, Cheikh Anta Diop, Kalala Omotunde.",
      },
    ],
  },
  {
    numero: "02",
    titre: "La construction du complexe d’infériorité",
    points: [
      { nom: "Le « masque blanc »", detail: "Fanon et la hiérarchie raciale intériorisée." },
      { nom: "Le rôle des religions importées", detail: "dans la dévalorisation de soi." },
      { nom: "Le regard occidental comme norme", detail: "intériorisé par l’éducation." },
    ],
  },
  {
    numero: "03",
    titre: "La rupture spirituelle et cosmologique",
    points: [
      {
        nom: "Cosmologies bantoues",
        detail: "Muntu, Ubuntu, vitalisme, systèmes dogon, ordre cosmique, ancestralité.",
      },
      {
        nom: "Pensée yoruba",
        detail: "Ori, ashé, iwà-pèlè.",
      },
      {
        nom: "La rupture de la transmission",
        detail: "provoquée par la colonisation.",
      },
    ],
  },
];

export default function AcademieProgramme() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="academie-programme"
      ref={ref}
      className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="academie-programme-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Apprendre &amp; transmettre
        </p>
        <h2
          id="academie-programme-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Programme Académie Muntu
        </h2>

        <div className={cn("mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center", visible && "animate-fade-in-delay-1")}>
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert/70">
              Partie I
            </h3>
            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-anthracite/80">
              L’histoire et la philosophie de la crise identitaire africaine.
            </p>

            <ol className="relative mt-8 space-y-4" aria-label="Modules de la Partie I">
              <span className="absolute bottom-2 left-[19px] top-4 w-px bg-or/35" aria-hidden />
              {modules.map((mod, index) => (
                <li key={mod.titre} className="relative flex items-start gap-6">
                  <span
                    className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-or/70 bg-vert-profond/50 font-sans text-xs font-bold text-or-clair"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-xl font-semibold text-vert">
                      {mod.titre}
                    </h3>
                    <details className="group mt-3">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-full border border-vert/30 bg-white/60 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-vert transition-colors hover:border-or hover:text-or">
                        Voir le contenu
                        <ChevronDown className="h-4 w-4 text-or/70 transition-transform duration-300 group-open:rotate-180" aria-hidden />
                      </summary>
                      <ul className="mt-3 space-y-2 border-t border-or/15 pt-3">
                        {mod.points.map((point) => (
                          <li key={point.nom} className="flex flex-col gap-1">
                            <span className="font-sans text-sm font-semibold text-vert">
                              {point.nom}
                            </span>
                            <span className="font-sans text-[13px] leading-relaxed text-anthracite/80">
                              {point.detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>

                  {index < modules.length - 1 && (
                    <ArrowDown
                      className="ml-auto mt-1 h-4 w-4 shrink-0 text-or-clair/60"
                      aria-hidden
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}