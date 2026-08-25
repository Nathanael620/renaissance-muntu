import { ArrowRight, Info, Send } from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { requestContactModal } from "../ContactModal/contactModalEvents";
import { cn } from "../../utils/cn";

/**
 * Section 7 — Appel à l'action institutionnel.
 * Propose des voies d'engagement générales, sans inventer de dispositif inexistant.
 */
export default function TransmissionCTA() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="transmission-participation"
      ref={ref}
      className="rounded-[2rem] border border-or/40 bg-vert-profond/95 px-6 py-12 text-white shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="transmission-participation-title"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-or-clair">
          Rejoindre le pilier
        </p>
        <h2
          id="transmission-participation-title"
          className="mx-auto max-w-3xl font-serif text-3xl font-semibold uppercase tracking-wide text-white sm:text-4xl"
        >
          Prendre part à la transmission
        </h2>
        <p className="mx-auto max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
          Rejoindre la Transmission du NTU, c&rsquo;est se placer dans une chaîne&nbsp;:
          recevoir pour se restaurer, se restaurer pour transmettre, transmettre pour
          accompagner. Chaque participation compte, quelle que soit sa forme.
        </p>

        <div className={cn("flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap", visible && "animate-fade-in-delay-1")}>
          <a
            href="#transmission-axes"
            className="btn-or inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
          >
            Découvrir les programmes
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => requestContactModal()}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-vert/70 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-or hover:bg-vert"
          >
            <Send className="h-4 w-4" aria-hidden />
            Nous contacter
          </button>
          <a
            href="#transmission-parcours"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:border-or hover:text-or-clair"
          >
            <Info className="h-4 w-4" aria-hidden />
            S&rsquo;informer
          </a>
        </div>
      </div>
    </section>
  );
}