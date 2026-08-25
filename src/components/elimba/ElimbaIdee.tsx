/**
 * Section « Idée » de la page Elimb'a Dikalo.
 */
export default function ElimbaIdee() {
  return (
    <section
      id="elimba-idee"
      className="rounded-[2rem] bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="elimba-idee-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Idée
        </p>
        <h2
          id="elimba-idee-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Une école de guérison intérieure des peuples
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
            <p>
              Aujourd’hui, beaucoup de personnes parlent de politique, de tribalisme,
              d’économie, de foncier, d’histoire. Très peu parlent de la transformation
              intérieure. Or, si on veut réellement prévenir les conflits avant qu’ils
              n’éclatent, il faut agir là où ils naissent.
            </p>
            <p className="font-serif text-lg font-semibold text-vert">
              À notre avis, ils naissent d’abord dans le cœur.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-or/20 bg-creme p-6 shadow-sm">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-or-fonce">
              Racines intérieures des conflits
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm leading-relaxed text-anthracite">
              {[
                "La jalousie",
                "L’orgueil",
                "La peur",
                "La cupidité",
                "Le ressentiment",
                "Le refus de reconnaître ses propres faiblesses",
              ].map((item) => (
                <li key={item} className="col-span-2 sm:col-span-1 flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-or/20 pt-4 font-serif text-sm font-semibold uppercase leading-relaxed text-vert">
              Elimb&rsquo;a Dikalo n’est donc pas un projet contre le tribalisme. C’est
              une école de guérison intérieure des peuples.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}