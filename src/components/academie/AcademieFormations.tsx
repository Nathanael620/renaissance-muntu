import { ArrowRight, BookOpen, CalendarDays, GraduationCap, Users, Wrench } from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { requestContactModal } from "../ContactModal/contactModalEvents";
import { cn } from "../../utils/cn";

/**
 * Section 6 — Formation & Ateliers.
 * Formats d'apprentissage + CTA dédiés (architecture prête pour un futur backend).
 */
const offre = [
  {
    icone: GraduationCap,
    titre: "Formations",
    description: "Parcours structurés, théoriques et pratiques.",
  },
  {
    icone: Wrench,
    titre: "Ateliers",
    description: "Exercices de mise en pratique et de dialogue.",
  },
  {
    icone: Users,
    titre: "Conférences",
    description: "Interventions de spécialistes et de penseurs.",
  },
  {
    icone: CalendarDays,
    titre: "Rencontres",
    description: "Moments d'échange et de mise en réseau.",
  },
  {
    icone: BookOpen,
    titre: "Ressources pédagogiques",
    description: "Supports, bibliographies et médiathèque.",
  },
];

export default function AcademieFormations() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="academie-formations"
      ref={ref}
      className="rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="academie-formations-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Se former concrètement
        </p>
        <h2
          id="academie-formations-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Formation &amp; Ateliers
        </h2>

        {/* Formats — grille évolutive (back-end futur). */}
        <div className={cn("mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", visible && "animate-fade-in-delay-1")}>
          {offre.map((item) => {
            const Icon = item.icone;
            return (
              <article
                key={item.titre}
                className="flex h-full flex-col items-start gap-3 rounded-[1.5rem] border border-or/20 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-vert/10 text-vert">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-serif text-lg font-semibold uppercase leading-snug text-vert">
                  {item.titre}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-anthracite/80">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#academie-domaines"
            className="btn-or inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
          >
            Voir les formations
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#academie-raison-ettre"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-vert/40 bg-white px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-vert transition-colors duration-200 hover:border-or hover:text-or"
          >
            Participer à un atelier
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => requestContactModal()}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-vert px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:border-or"
          >
            Découvrir les conférences
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}