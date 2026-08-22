/**
 * Section « 4 Principes directeurs » — Elimb'a Dikalo.
 */
export default function ElimbaPrincipesDirecteurs() {
  const principes = [
    {
      title: "Apprendre de nos différences",
      desc: "Elimb’a Dikalo considère que les différences culturelles peuvent constituer une richesse lorsqu’elles permettent la rencontre, le dialogue, la découverte et l’apprentissage mutuel.",
    },
    {
      title: "Valoriser les bonnes pratiques",
      desc: "Chaque communauté possède des expériences, des savoirs, des pratiques et des valeurs susceptibles d’enrichir les autres. Le programme encourage leur identification, leur transmission et leur partage.",
    },
    {
      title: "Former des bâtisseurs de paix",
      desc: "Développer chez les jeunes des capacités de dialogue, de réflexion, de responsabilité, de résolution pacifique des différends et de service à leur communauté. Le changement collectif commence par la transformation des attitudes individuelles.",
    },
    {
      title: "Préserver et transmettre les patrimoines",
      desc: "Favoriser la connaissance et la transmission des langues, traditions, récits familiaux, savoir-faire, pratiques culturelles et valeurs qui contribuent à la mémoire et à l’identité des communautés.",
    },
  ];

  return (
    <section
      id="elimba-principes"
      className="rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="elimba-principes-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-center justify-center gap-4 md:mb-12">
          <span className="hidden h-px flex-1 max-w-40 bg-or/60 sm:block" aria-hidden />
          <h2
            id="elimba-principes-title"
            className="text-center font-serif text-2xl font-semibold uppercase tracking-wide text-vert md:text-3xl"
          >
            Les 4 principes directeurs
          </h2>
          <span className="hidden h-px flex-1 max-w-40 bg-or/60 sm:block" aria-hidden />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {principes.map((p) => (
            <article
              key={p.title}
              className="flex flex-col rounded-[1.75rem] border border-or/20 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <h3 className="font-serif text-lg font-bold uppercase leading-snug text-vert">
                {p.title}
              </h3>
              <p className="mt-4 flex-1 font-sans text-sm leading-relaxed text-anthracite/85">
                {p.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}