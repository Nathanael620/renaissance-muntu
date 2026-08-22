/**
 * Section « Activités » — Elimb'a Dikalo.
 */
import { ArrowRight } from "lucide-react";

export default function ElimbaActivites() {
  const activites = [
    "des programmes d&rsquo;éducation et de formation destinés aux jeunes et à leurs familles",
    "des ateliers pratiques de transmission, de dialogue et de réflexion",
    "des conférences, discussions et débats encadrés",
    "des activités éducatives portant sur les discriminations, le dialogue interculturel, la violence, l&rsquo;intimidation et l&rsquo;exclusion",
    "des activités de réflexion, d&rsquo;attention et de méditation dans un cadre éducatif",
    "des rencontres intergénérationnelles et interculturelles",
    "des témoignages et activités de transmission de savoirs et de bonnes pratiques",
    "la conception et la diffusion de capsules éducatives (radio, plateformes numériques)",
    "la création d&rsquo;outils et de contenus pédagogiques",
  ];

  return (
    <section
      id="elimba-activites"
      className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="elimba-activites-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Activités
        </p>
        <h2
          id="elimba-activites-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Ce que nous mettons en œuvre
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {activites.map((act) => (
            <div
              key={act}
              className="flex items-start gap-3 rounded-[1.5rem] border border-or/20 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-vert text-white">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
              <p className="font-sans text-sm leading-relaxed text-anthracite/85">
                {act}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}