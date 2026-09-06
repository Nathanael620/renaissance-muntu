import { ArrowRight, Send } from "lucide-react";
import { requestContactModal } from "../ContactModal/contactModalEvents";
import { navigateTo } from "../../utils/navigate";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 8 — Appel à l'engagement final.
 * CTA uniquement vers des routes et mécanismes EXISTANTS du site.
 */
export default function EquipeCTA() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="equipe-cta"
      ref={ref}
      className="rounded-[2rem] border border-or/40 bg-vert-profond/95 px-6 py-12 text-white shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="equipe-cta-title"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-or-clair">
          Rejoindre la dynamique
        </p>
        <h2
          id="equipe-cta-title"
          className="mx-auto max-w-3xl font-serif text-3xl font-semibold uppercase tracking-wide text-white sm:text-4xl"
        >
          Contribuer à la vision qui porte l&rsquo;équipe
        </h2>
        <p className="mx-auto max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
          Chaque talent, chaque engagement et chaque compétence peut trouver sa
          place dans cette dynamique collective, au service de la Renaissance du
          Muntu.
        </p>

        <div
          className={cn(
            "flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap",
            visible && "animate-fade-in-delay-1",
          )}
        >
          <a
            href="/#vision"
            onClick={(event) => navigateTo(event, "/#vision")}
            className="btn-or inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
          >
            Découvrir notre vision
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="/#piliers"
            onClick={(event) => navigateTo(event, "/#piliers")}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-vert/70 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-or hover:bg-vert"
          >
            Explorer nos piliers
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => requestContactModal()}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:border-or hover:text-or-clair"
          >
            <Send className="h-4 w-4" aria-hidden />
            Nous contacter
          </button>
        </div>
      </div>
    </section>
  );
}