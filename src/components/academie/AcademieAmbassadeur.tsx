import { ArrowRight } from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { requestContactModal } from "../ContactModal/contactModalEvents";
import { cn } from "../../utils/cn";

/**
 * Section 9 — Devenir ambassadeur de solution.
 * Appel à l'action fort, adressé aux jeunes.
 */
export default function AcademieAmbassadeur() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="academie-ambassadeur"
      ref={ref}
      className="relative overflow-hidden rounded-[2rem] bg-vert px-6 py-14 text-white shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="academie-ambassadeur-title"
    >
      <span className="absolute -right-8 -top-8 h-56 w-56 rounded-full border-[10px] border-or/15" aria-hidden />
      <span className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full border-[10px] border-or/10" aria-hidden />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-or-clair">
          Prendre part
        </p>
        <h2
          id="academie-ambassadeur-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-white sm:text-4xl"
        >
          Devenir un ambassadeur de solution
        </h2>
        <p className="mt-5 font-sans text-sm leading-relaxed text-white/85 sm:text-base">
          Chaque jeune formé à l&rsquo;Académie devient un relais de la renaissance&nbsp;:
          fier de son histoire, lucide sur les mécanismes du passé et acteur
          de la transformation de sa société.
        </p>

        <div className={cn("mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row", visible && "animate-fade-in-delay-1")}>
          <button
            type="button"
            onClick={() => requestContactModal()}
            className="btn-or inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
          >
            Je veux m&rsquo;engager
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
          <a
            href="#academie-programme"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-vert/70 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-or hover:bg-vert"
          >
            En savoir plus
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}