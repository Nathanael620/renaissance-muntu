import { BookOpen } from "lucide-react";
import africaMap from "../../assets/images/Africa.png";
import { ressources } from "../../data/siteData";

/**
 * Nos Ressources — carte Afrique + liste (maquette)
 */
export default function Ressources() {
  return (
    <article
      id="ressources"
      className="flex h-full flex-col rounded-2xl border border-or/30 bg-creme-clair p-6 shadow-sm md:p-7"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-or/40 bg-white">
          <img src={africaMap} alt="" className="h-9 w-9 object-contain" />
        </span>
        <h2 className="font-serif text-lg font-semibold uppercase tracking-wide text-vert md:text-xl">
          Nos ressources
        </h2>
      </div>
      <div className="mb-4 h-px w-full bg-or/30" aria-hidden />

      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative mx-auto w-36 shrink-0 sm:mx-0 sm:w-40">
          <img
            src={africaMap}
            alt="Carte de l'Afrique"
            className="h-auto w-full object-contain"
            loading="lazy"
          />
        </div>

        <ul className="flex-1 space-y-1.5">
          {ressources.map((item) => (
            <li key={item} className="flex items-center gap-2 font-sans text-sm text-anthracite">
              <span className="h-1.5 w-1.5 rounded-full bg-vert" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#bibliotheque"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-vert px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-vert-fonce"
      >
        <BookOpen className="h-4 w-4" aria-hidden />
        Voir la bibliothèque
      </a>
    </article>
  );
}
