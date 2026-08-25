/**
 * Section « Mission » mise à jour — Elimb'a Dikalo.
 */
export default function ElimbaMission() {
  return (
    <section
      id="elimba-missions"
      className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="elimba-missions-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Mission
        </p>
        <h2
          id="elimba-missions-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Éduquer, dialoguer, prévenir
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="space-y-5 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
            <p>
              Elimb&rsquo;a Dikalo est une initiative de <span className="font-semibold text-vert">Mener Autrement</span> consacrée à l&rsquo;éducation, au dialogue interculturel et à la
              prévention des fractures communautaires. Destinée principalement aux jeunes et à leurs
              familles, elle vise à&nbsp;:
            </p>
            <ul className="space-y-3 pl-1">
              {[
                "transformer les différences culturelles en occasions d’apprentissage",
                "prévenir les discriminations",
                "favoriser la compréhension mutuelle, la responsabilité, la transmission, la solidarité et la résolution pacifique des différends",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
                  <span className="font-semibold text-vert">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-or/20 bg-white p-6 shadow-sm">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-or-clair">
              Moyens d&rsquo;action
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-anthracite">
              {[
                "Ateliers éducatifs et formations",
                "Conférences et discussions encadrées",
                "Activités de réflexion et de dialogue",
                "Outils de sensibilisation et capsules éducatives",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vert" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Conclusion des moyens d'action — mise en gras */}
            <p className="mt-5 border-t border-or/20 pt-4 font-sans text-sm font-bold leading-relaxed text-anthracite">
              Elimb&rsquo;a Dikalo contribue à former des jeunes capables de devenir des
              acteurs de dialogue, de responsabilité et de paix au sein de leur famille et de
              leur communauté.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}