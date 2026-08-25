/**
 * Section « Motivation » de la page Elimb'a Dikalo.
 */
export default function ElimbaMotivation() {
  return (
    <section
      id="elimba-motivation"
      className="rounded-[2rem] bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="elimba-motivation-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Motivation
        </p>
        <h2
          id="elimba-motivation-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Pourquoi Elimb&rsquo;a Dikalo
        </h2>
        <div className="mt-8 mx-auto max-w-4xl">
          <p className="font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
            Le clivage et l’indexation d’un groupe dans un pays est très dangereux pour la
            cohésion sociale et le vivre-ensemble. Le manque de courage de reconnaître leurs
            faiblesses et les fabulations des parents d&rsquo;aujourd&rsquo;hui deviennent des
            vérités de leurs enfants futurs-parents. Nous voulons contribuer à faire taire cette
            fausse note musicale accusatrice et clivante qui pourrait entraîner des conséquences
            destructrices à moyen et long terme pour tout le monde.
          </p>
        </div>
      </div>
    </section>
  );
}