/**
 * Section « Philosophie » — Elimb'a Dikalo.
 */
export default function ElimbaPhilosophie() {
  return (
    <section
      id="elimba-philosophie"
      className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="elimba-philosophie-title"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Philosophie
        </p>
        <h2
          id="elimba-philosophie-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          La philosophie d&rsquo;Elimb&rsquo;a Dikalo
        </h2>
        <div className="mt-8 rounded-[1.75rem] border border-or/20 bg-white p-8 shadow-sm">
          <p className="font-serif text-xl italic leading-relaxed text-anthracite/90">
            « Toute communauté grandit lorsqu’elle est capable de reconnaître ses forces,
            d’assumer ses responsabilités et d’apprendre des réussites des autres, sans
            renoncer à son identité. »
          </p>
        </div>
        <p className="mt-6 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
          La philosophie d’Elimb&rsquo;a Dikalo peut être formulée ainsi&nbsp;: toute
          communauté grandit lorsqu’elle est capable de reconnaître ses forces, d’assumer
          ses responsabilités et d’apprendre des réussites des autres, sans renoncer à son
          identité.
        </p>
      </div>
    </section>
  );
}