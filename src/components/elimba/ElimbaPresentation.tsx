/**
 * Section « Présentation » de la page Elimb'a Dikalo.
 */
export default function ElimbaPresentation() {
  return (
    <section
      id="elimba-presentation"
      className="rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="elimba-presentation-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Présentation
        </p>
        <h2
          id="elimba-presentation-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Une écologie spirituelle des peuples
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="space-y-5 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
            <p>
              Les peuples ne s’appauvrissent pas seulement lorsque leurs ressources
              disparaissent. Ils commencent à s’appauvrir lorsqu’ils perdent la capacité de
              regarder leurs propres faiblesses avec humilité.
            </p>
            <p>
              L’histoire montre que les grandes divisions entre les communautés ne naissent
              presque jamais de la seule différence entre les peuples. Elles naissent plus souvent de
              la peur, de l’incompréhension, de la jalousie, de la méfiance, de la
              désinformation et de la recherche de responsables extérieurs à nos propres difficultés.
            </p>
            <p>
              Notre initiative ne cherche ni à défendre une communauté contre une autre, ni à
              distribuer les torts. Elle invite chaque peuple à entreprendre un chemin d’examen
              de conscience, à reconnaître humblement ce qu’il peut améliorer, à apprendre des
              qualités des autres sans renoncer à sa propre identité et à transmettre aux générations
              futures une culture de responsabilité plutôt qu’une culture de victimisation.
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-or/20 bg-white p-6 shadow-sm">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-or-fonce">
                Protéger avant qu’il ne soit trop tard
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-anthracite/90">
                De la même manière que l’on protège une forêt avant qu’elle ne soit
                détruite, nous devons protéger&nbsp;:
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-anthracite">
                {[
                  "les consciences",
                  "les mémoires",
                  "les paroles",
                  "les relations entre les peuples",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vert" aria-hidden />
                    <span className="font-semibold text-vert">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-vert/20 bg-vert/5 p-6 shadow-sm">
              <p className="font-serif text-sm leading-relaxed text-vert/90">
                <span className="font-semibold">Elimb&rsquo;a Dikalo</span> n’est pas seulement
                une initiative de cohésion sociale. C’est une initiative d’écologie
                spirituelle des peuples.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}