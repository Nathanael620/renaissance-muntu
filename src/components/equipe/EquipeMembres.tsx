import { translateContent } from "../../i18n/translateContent";
import { equipeCollectif } from "../../data/equipeData";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";
import EquipeMembreCard from "./EquipeMembreCard";

/**
 * Section 3 — Les membres de l'équipe.
 * Grille de cartes pilotée par `equipeData.ts` : les fiches sont des
 * placeholders élégants tant que les informations officielles ne sont pas
 * fournies (ajout / suppression / modification via `src/data/equipeData.ts`).
 */
export default function EquipeMembres() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="equipe-membres"
      ref={ref}
      className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="equipe-membres-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
            {translateContent("Le collectif ")}</p>
          <h2
            id="equipe-membres-title"
            className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
          >
            {translateContent("Les membres de l&rsquo;équipe ")}</h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-anthracite/80 sm:text-base">
            {translateContent("Chacune et chacun, à sa place, contribue à faire vivre la vision du mouvement. Les profils individuels et les photographies seront publiés après validation institutionnelle. ")}</p>
        </div>

        <div
          className={cn(
            "mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4",
            visible && "animate-fade-in-delay-1",
          )}
        >
          {equipeCollectif.map((membre, index) => (
            <EquipeMembreCard
              key={`${membre.name}-${index}`}
              membre={membre}
            />
          ))}
        </div>

        {translateContent(equipeCollectif.length === 0 && (
          <p className="mt-10 rounded-[1.75rem] border border-dashed border-or/40 bg-creme-clair p-8 text-center font-sans text-sm text-anthracite/70">
            {translateContent("La composition du collectif sera annoncée prochainement. ")}</p>
        ))}

        <p className="mt-8 text-center font-sans text-xs uppercase tracking-[0.2em] text-anthracite/50">
          {translateContent("Les informations officielles seront publiées prochainement. ")}</p>
      </div>
    </section>
  );
}