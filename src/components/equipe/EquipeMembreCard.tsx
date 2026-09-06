import type { MembreEquipe } from "../../data/equipeData";
import EquipePhotoPlaceholder from "./EquipePhotoPlaceholder";

/**
 * Carte membre — hiérarchie visuelle sobre et institutionnelle :
 * photographie (ou cadre temporaire), nom, fonction, courte présentation,
 * puis domaines d'expertise éventuels.
 * Le ratio 4/5 garantit une présentation identique pour toutes les photos
 * futures, quelle que soit leur orientation d'origine.
 */
export default function EquipeMembreCard({ membre }: { membre: MembreEquipe }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-or/25 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {membre.image ? (
        <img
          src={membre.image}
          alt={`Portrait de ${membre.name}`}
          className="aspect-[4/5] w-full object-cover object-center"
          loading="lazy"
        />
      ) : (
        <EquipePhotoPlaceholder
          name={membre.name}
          className="aspect-[4/5] border-b border-or/25"
          label="Photographie à venir"
        />
      )}

      <div className="flex grow flex-col p-6 md:p-7">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-or">
          {membre.statut === "direction"
            ? "Équipe dirigeante"
            : "Membre de l'équipe"}
        </p>
        <h3 className="mt-2.5 font-serif text-lg font-semibold uppercase leading-snug tracking-wide text-vert">
          {membre.name}
        </h3>
        <p className="mt-1.5 font-sans text-xs font-medium uppercase tracking-[0.14em] text-anthracite/70">
          {membre.role}
        </p>
        <p className="mt-4 font-sans text-sm leading-relaxed text-anthracite/85">
          {membre.description}
        </p>

        {membre.expertises.length > 0 && (
          <ul
            className="mt-5 flex flex-wrap gap-2"
            aria-label="Domaines d'expertise"
          >
            {membre.expertises.map((expertise) => (
              <li
                key={expertise}
                className="rounded-full border border-or/20 bg-creme px-3 py-1 font-sans text-[11px] font-medium text-vert"
              >
                {expertise}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}