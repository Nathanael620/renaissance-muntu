import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 2 — Introduction institutionnelle de l'équipe.
 * Ton sobre, humain et intellectuel ; aucune information non officielle.
 */
export default function EquipeIntro() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="equipe-intro"
      ref={ref}
      className="rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="equipe-intro-title"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] lg:items-start">
        <div
          className={cn(
            "space-y-5 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base",
            visible && "animate-fade-in",
          )}
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
            Introduction
          </p>
          <h2
            id="equipe-intro-title"
            className="font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
          >
            Ceux qui portent la vision
          </h2>
          <p>
            Derrière toute vision se trouvent des femmes et des hommes qui
            choisissent de la porter, de la transmettre et de la faire vivre.
          </p>
          <p>
            Notre équipe réunit des profils, des expériences et des sensibilités
            complémentaires, animés par une même conviction : contribuer à la
            renaissance des consciences, des peuples et de la civilisation.
          </p>
          <p>
            Chaque membre agit dans la continuité institutionnelle du mouvement,
            au service des cinq piliers qui structurent son engagement et de la
            pensée qui l&rsquo;anime.
          </p>
        </div>

        {/* Repère symbolique — esprit collectif */}
        <aside
          className="flex flex-col items-center gap-6 rounded-[1.75rem] border border-or/25 bg-vert/5 p-8 text-center shadow-sm"
          aria-label="L'esprit de l'équipe"
        >
          <div className="relative flex h-28 w-28 items-center justify-center" aria-hidden>
            <span className="absolute inset-0 rounded-full border border-or/30" />
            <span className="absolute inset-[10px] rounded-full border border-or/45" />
            <span className="absolute inset-[20px] rounded-full border border-or/65" />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-vert">
              <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-creme">
                MUNTU
              </span>
            </span>
          </div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-vert">
            L&rsquo;esprit de l&rsquo;équipe
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {[
              "Complémentarité",
              "Responsabilité",
              "Transmission",
              "Exigence",
            ].map((valeur) => (
              <li
                key={valeur}
                className="rounded-full border border-or/25 bg-creme-clair px-3.5 py-1.5 font-sans text-[11px] font-medium uppercase tracking-wide text-vert"
              >
                {valeur}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}