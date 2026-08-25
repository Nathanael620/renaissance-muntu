import { BookText, FileText, Mic, Newspaper, PlayCircle, type LucideIcon, Video } from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 7 — Savoir & Ressources.
 * Cartes réutilisables (articles, podcasts, vidéos…) — données prêtes à être
 * branchées sur un futur backend, sans changer la structure.
 */
type Ressource = {
  icone: LucideIcon;
  type: string;
  titre: string;
  statut: "disponible" | "à venir";
};

const ressources: Ressource[] = [
  { icone: Newspaper, type: "Articles", titre: "La renaissance par la conscience", statut: "disponible" },
  { icone: FileText, type: "Documents", titre: "Cosmologies : repères pour une lecture digne", statut: "disponible" },
  { icone: Mic, type: "Podcasts", titre: "Voix panafricaines", statut: "disponible" },
  { icone: PlayCircle, type: "Reportages", titre: "Territoires et mémoires", statut: "disponible" },
  { icone: Video, type: "Documentaires", titre: "Histoire, mythe et reconstruction", statut: "disponible" },
  { icone: BookText, type: "Publications", titre: "Écritures de la jeune renaissance", statut: "à venir" },
];

export default function AcademieRessources() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="academie-ressources"
      ref={ref}
      className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="academie-ressources-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Savoir &amp; médiathèque
        </p>
        <h2
          id="academie-ressources-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Savoir &amp; Ressources
        </h2>

        <div className={cn("mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", visible && "animate-fade-in-delay-1")}>
          {ressources.map((ressource) => {
            const Icon = ressource.icone;
            const isUpcoming = ressource.statut === "à venir";
            return (
              <article
                key={ressource.titre}
                className="flex h-full flex-col rounded-[1.5rem] border border-or/20 bg-creme-clair p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-vert/10 text-vert">
                    <Icon className="h-5 w-5 rounded-xl" aria-hidden />
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wide",
                      isUpcoming
                        ? "bg-or/15 text-or-fonce"
                        : "bg-vert/10 text-vert",
                    )}
                  >
                    {ressource.statut}
                  </span>
                </div>
                <p className="mt-4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-or-fonce">
                  {ressource.type}
                </p>
                <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-vert">
                  {ressource.titre}
                </h3>
                <p className="mt-2 font-sans text-xs leading-relaxed text-anthracite/70">
                  Contenu éditorial à venir pour enrichir cette ressource.
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}