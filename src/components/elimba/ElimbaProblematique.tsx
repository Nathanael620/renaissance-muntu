/**
 * Section « Problématique » de la page Elimb'a Dikalo.
 * Conforme au document fondateur.
 */
export default function ElimbaProblematique() {
  return (
    <section
      id="elimba-problematique"
      className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="elimba-problematique-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Problématique
        </p>
        <h2
          id="elimba-problematique-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Des consciences divisées avant les peuples
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          {/* Colonne texte */}
          <div className="space-y-5 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
            <p>
              Avant de diviser les peuples, les conflits divisent les consciences.
              Avant de détruire les nations, ils détruisent les cœurs.
            </p>
            <p>
              Une société ne devient pas injuste par hasard. Elle devient injuste lorsque&nbsp;:
            </p>
            <ul className="space-y-2.5 pl-1">
              {[
                "l’orgueil remplace l’humilité",
                "la cupidité remplace la transmission",
                "la peur remplace la confiance",
                "le ressentiment remplace la reconnaissance",
                "la recherche de boucs émissaires remplace l’examen de conscience",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
                  <span>Lorsque <span className="font-semibold text-vert">{item}</span>.</span>
                </li>
              ))}
            </ul>
            <p>
              Toute communauté est appelée à traverser ce combat intérieur. Ce combat n&apos;oppose
              pas un peuple à un autre. Il oppose chaque peuple à ses propres faiblesses.
            </p>
            <div className="rounded-[1.75rem] border border-or/20 bg-white p-5 shadow-sm">
              <p className="font-serif text-base italic leading-relaxed text-anthracite/90">
                « Ce qui se passe dans la case des poules, se passe dans la case des canards. »
              </p>
              <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-vert">
                Sagesse camerounaise
              </p>
            </div>
          </div>

          {/* Colonne exemples */}
          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-or/20 bg-white p-6 shadow-sm">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-or-fonce">
                Exemples de fractures
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-anthracite">
                {[
                  "La fabrication du bouc émissaire, l’Africain devenu étranger en Afrique (Afrique du Sud)",
                  "La haine ethnique entre Hutus et Tutsis au Rwanda",
                  "La ségrégation raciale institutionnalisée (apartheid) en Afrique du Sud",
                  "Les tensions entre communautés ethniques et religieuses (Chinois, Malais, Indiens) à Singapour",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vert" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-vert/20 bg-vert/5 p-6 shadow-sm">
              <p className="font-serif text-sm font-semibold uppercase leading-relaxed text-vert">
                « Une même terre peut porter plusieurs racines sans cesser d&apos;être un seul arbre. »
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}