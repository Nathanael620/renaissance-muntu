import { institutIdentite, missionInfo, valeurs } from "../../data/siteData";

/**
 * Mission — document officiel « Institut pour la Renaissance du Muntu » :
 * mission générale + mission explicative + 5 orientations.
 */
export default function Mission() {
  return (
    <section
      id="mission"
      className="bg-creme px-4 py-12 md:px-8 md:py-14 lg:px-10 lg:py-16"
      aria-labelledby="mission-title"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 border-b border-or/25 pb-8 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-or-fonce">
            {institutIdentite.titre}
          </p>
          <p className="mx-auto mt-3 max-w-2xl font-serif text-xl italic leading-relaxed text-vert md:text-2xl">
            « {institutIdentite.sousTitre} »
          </p>
          <p className="mx-auto mt-4 max-w-3xl font-sans text-sm leading-7 text-anthracite md:text-base">
            {institutIdentite.nom}, {institutIdentite.natureJuridique}, œuvrant dans les
            domaines suivants: {institutIdentite.domaines.join(", ")}.
          </p>
        </div>

        <h2
          id="mission-title"
          className="text-center font-serif text-2xl font-semibold uppercase tracking-wide text-vert md:text-3xl"
        >
          Notre mission
        </h2>

        {/* Mission générale */}
        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-or/35 bg-creme-clair px-6 py-7 shadow-[0_8px_24px_rgba(13,40,24,0.06)] md:px-10 md:py-8">
          <p className="text-center font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-or-fonce">
            Mission générale
          </p>
          <p className="mt-4 text-center font-serif text-lg italic leading-relaxed text-vert md:text-xl">
            « {missionInfo.general} »
          </p>
        </div>

        {/* Mission explicative */}
        <p className="mx-auto mt-8 max-w-4xl text-center font-sans text-sm leading-7 text-anthracite md:text-base">
          {missionInfo.explicative}
        </p>

        {/* Orientations */}
        <p className="mt-10 text-center font-sans text-sm font-bold uppercase tracking-[0.18em] text-or-fonce md:text-base">
          Elle vise à
        </p>
        <ul className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {missionInfo.orientations.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-or/25 bg-creme-clair px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-or/50 hover:shadow-md"
            >
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vert text-[10px] font-bold text-or-clair" aria-hidden>
                ✓
              </span>
              <span className="font-sans text-sm font-medium leading-6 text-vert">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-14 border-t border-or/25 pt-10">
          <p
            id="valeurs-fondamentales"
            className="text-center font-sans text-sm font-bold uppercase tracking-[0.18em] text-or-fonce md:text-base"
          >
            Nos Valeurs Fondamentales
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {valeurs.map((valeur) => (
              <article
                key={valeur.title}
                className="group rounded-xl border border-or/25 bg-creme-clair px-5 py-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-or/50 hover:shadow-md"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-or transition-all duration-300 group-hover:w-16" aria-hidden />
                <h3 className="font-serif text-base font-semibold uppercase leading-snug text-vert md:text-lg">
                  {valeur.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-6 text-anthracite">
                  {valeur.text}.
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
