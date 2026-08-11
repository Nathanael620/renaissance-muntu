/**
 * Mission — texte institutionnel DCFT §3.3
 */
export default function Mission() {
  return (
    <section
      id="mission"
      className="bg-creme px-4 py-10 md:px-8 lg:px-10"
      aria-labelledby="mission-title"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2
          id="mission-title"
          className="font-serif text-xl font-semibold uppercase tracking-wide text-vert md:text-2xl"
        >
          Notre mission
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-anthracite md:text-base">
          Transformer les consciences pour transformer les sociétés. Porter, à
          l&apos;échelle du continent et de sa diaspora, une vision pour
          l&apos;Afrique et pour le monde, et bâtir une paix durable, une
          humanité digne et une civilisation féconde.
        </p>
      </div>
    </section>
  );
}
