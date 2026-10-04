import { translateContent } from "../../i18n/translateContent";
import { equipeDirection } from "../../data/equipeData";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";
import EquipeMembreCard from "./EquipeMembreCard";

/**
 * Section 4 — Équipe dirigeante ou fondatrice.
 * Affiche les fiches déclarées avec `statut: "direction"` dans `equipeData.ts`.
 * Tant qu'aucune composition officielle n'est communiquée, un bandeau
 * institutionnel accompagne trois cadres réservés (composition future).
 */
export default function EquipeDirection() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="equipe-direction"
      ref={ref}
      className="rounded-[2rem] border border-or/30 bg-vert-profond/95 px-6 py-10 text-white shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="equipe-direction-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)]",
            visible && "animate-fade-in",
          )}
        >
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-or-clair">
              {translateContent("Équipe dirigeante ")}</p>
            <h2
              id="equipe-direction-title"
              className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-white sm:text-4xl"
            >
              {translateContent("Une gouvernance au service de la vision ")}</h2>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
              {translateContent("L&rsquo;organisation du mouvement repose sur une gouvernance collégiale, transparente et tournée vers le long terme. La composition officielle de l&rsquo;équipe dirigeante et du comité fondateur sera annoncée après validation institutionnelle. ")}</p>
          </div>

          {/* Cadres réservés à la composition officielle — décoratifs */}
          <div className="grid grid-cols-3 gap-4" aria-hidden>
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-or/25" />
                  <span className="absolute inset-[7px] rounded-full border border-or/40" />
                  <span className="absolute inset-[14px] rounded-full border border-or/55" />
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-vert-fonce" />
                </div>
                <p className="mt-3 font-sans text-[9px] uppercase tracking-[0.22em] text-white/40">
                  {translateContent("Portrait ")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fiches de l'équipe dirigeante, dès leur déclaration dans les données */}
        {translateContent(equipeDirection.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {equipeDirection.map((membre, index) => (
              <EquipeMembreCard
                key={`${membre.name}-${index}`}
                membre={membre}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}