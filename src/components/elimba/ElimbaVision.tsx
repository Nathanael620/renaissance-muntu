/**
 * Section « Vision du projet » — Elimb'a Dikalo.
 */
export default function ElimbaVision() {
  const objectifs = [
    "réduire les tensions identitaires",
    "déconstruire les discours de haine",
    "encourager l’autocritique constructive",
    "transmettre des modèles de réussite collective",
    "protéger la cohésion nationale",
  ];

  return (
    <section
      id="elimba-vision-projet"
      className="rounded-[2rem] bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="elimba-vision-projet-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Vision du projet
        </p>
        <h2
          id="elimba-vision-projet-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Créer un espace de dialogue constructif
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="space-y-5 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
            <p className="font-serif text-lg font-semibold text-vert">
              Créer un espace de dialogue honnête, apaisé et constructif entre Camerounais.
            </p>
            <p>
              Elimb&rsquo;a Dikalo aspire à un espace de dialogue honnête, apaisé et constructif
              entre Camerounais. Sa véritable force ne réside pas dans son analyse sociologique, mais
              dans sa profondeur spirituelle.
            </p>
            <p>
              <span className="font-semibold text-vert">Sawa-Bamiléké : Construire Ensemble</span>{" "}
              par exemple, est un cas d&rsquo;étude dans cette école de guérison.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-or/20 bg-creme p-6 shadow-sm">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-or-fonce">
              Objectifs
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-anthracite">
              {objectifs.map((obj) => (
                <li key={obj} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vert" aria-hidden />
                  <span className="font-semibold text-vert">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}