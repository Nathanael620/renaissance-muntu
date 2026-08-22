import { Target } from "lucide-react";
import { objectifs } from "../../data/siteData";

/**
 * Objectifs — document officiel « Institut pour la Renaissance du Muntu » :
 * objectif général + 5 axes structurants, chacun avec ses sous-objectifs.
 * Hiérarchie conservée.
 */
export default function Objectifs() {
  return (
    <section
      id="objectifs"
      className="bg-creme-clair px-4 py-12 md:px-8 lg:px-10"
      aria-labelledby="objectifs-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="objectifs-title"
          className="mb-8 text-center font-serif text-xl font-semibold uppercase tracking-wide text-vert md:text-2xl"
        >
          Nos objectifs
        </h2>

        {/* Objectif général */}
        <div className="mx-auto max-w-3xl rounded-xl border border-or/25 bg-vert-fonce p-6 shadow-sm">
          <p className="text-center font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-or-clair">
            Objectif général
          </p>
          <p className="mt-4 text-center font-serif text-base italic leading-relaxed text-white md:text-lg">
            {objectifs.general}
          </p>
        </div>

        {/* Objectifs spécifiques — 5 axes */}
        <p className="mb-6 mt-10 text-center font-sans text-base font-bold uppercase tracking-[0.18em] text-or-fonce md:text-lg">
          Objectifs spécifiques
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {objectifs.axes.map((axe) => (
            <div
              key={axe.title}
              className="flex flex-col rounded-xl border border-or/25 bg-creme p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <h3 className="flex items-center gap-3 font-serif text-base font-semibold text-vert">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-vert">
                  <Target className="h-4 w-4 text-or-clair" aria-hidden />
                </span>
                Axe
              </h3>
              <p className="mt-2 font-serif text-lg font-semibold uppercase leading-snug text-vert">
                {axe.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {axe.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-vert" aria-hidden />
                    <span className="font-sans text-sm leading-relaxed text-anthracite/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
