/**
 * Objectifs — valeurs fondatrices DCFT §3.4
 */
const objectifs = [
  { title: "Vérité", text: "Contenus sourcés, recherches rigoureuses, transparence." },
  { title: "Responsabilité", text: "Engagements visibles et reddition de comptes." },
  { title: "Dignité humaine", text: "Ligne éditoriale respectueuse et iconographie valorisante." },
  { title: "Transmission", text: "Famille, jeunesse et éducation au cœur de l'action." },
  { title: "Dialogue", text: "Échanges intergénérationnels et interculturels." },
  { title: "Bien commun", text: "Partage de la connaissance et accès ouvert." },
] as const;

export default function Objectifs() {
  return (
    <section
      id="objectifs"
      className="bg-creme-clair px-4 py-12 md:px-8 lg:px-10"
      aria-labelledby="objectifs-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="objectifs-title"
          className="mb-8 text-center font-serif text-xl font-semibold uppercase tracking-wide text-vert md:text-2xl"
        >
          Nos objectifs
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {objectifs.map((o) => (
            <div
              key={o.title}
              className="rounded-xl border border-or/25 bg-creme p-5 transition-shadow duration-300 hover:shadow-sm"
            >
              <h3 className="font-serif text-base font-semibold text-vert">{o.title}</h3>
              <p className="mt-2 font-sans text-sm text-anthracite/85">{o.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
