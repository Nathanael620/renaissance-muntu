/**
 * Section « Devise » — Elimb'a Dikalo.
 */
export default function ElimbaDevise() {
  return (
    <section
      id="elimba-devise"
      className="rounded-[2rem] bg-vert-fonce px-6 py-12 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="elimba-devise-title"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-or-clair">
          Notre devise
        </p>
        <h2
          id="elimba-devise-title"
          className="mt-4 font-serif text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl"
        >
          Une même terre. Plusieurs racines. Un seul avenir.
        </h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-5 font-sans text-sm leading-relaxed text-white/85 sm:text-base">
          <p className="italic">
            « Nous croyons qu’aucune communauté ne s’élève durablement en rabaissant une
            autre. Nous croyons que la paix se construit par la vérité, que la responsabilité est
            plus féconde que la victimisation, et que la transmission des bonnes pratiques est plus
            puissante que la recherche de boucs émissaires. »
          </p>
          <p>
            Elimb&rsquo;a Dikalo est un espace où les différences deviennent des occasions
            d’apprendre, où le dialogue remplace la méfiance, et où chaque Camerounais est
            invité à contribuer à un avenir commun. Parce qu’une même terre peut nourrir
            plusieurs racines sans cesser d’être un seul pays.
          </p>
        </div>
      </div>
    </section>
  );
}