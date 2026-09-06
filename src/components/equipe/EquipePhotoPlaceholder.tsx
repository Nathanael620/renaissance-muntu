import { cn } from "../../utils/cn";

type EquipePhotoPlaceholderProps = {
  /** Nom affiché uniquement pour la description accessible ; jamais inventé. */
  name?: string;
  /** Classes complémentaires (ratio, largeur, marge…). */
  className?: string;
  /** Légende visible sous l'emblème. */
  label?: string;
};

/**
 * Cadre photo institutionnel temporaire.
 * Composition graphique volontaire (cercles concentriques + monogramme MUNTU,
 * en écho au symbole NTU de la section Transmission) affichée tant que la
 * photographie réelle du membre n'est pas renseignée dans `equipeData.ts`.
 * Aucune fausse photo n'est utilisée ; le cadre ne ressemble jamais à un
 * contenu cassé.
 */
export default function EquipePhotoPlaceholder({
  name = "Membre de l'équipe",
  className,
  label = "Photographie à venir",
}: EquipePhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Portrait à venir — ${name}`}
      className={cn(
        "relative flex w-full select-none flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-vert/[0.05] to-vert/[0.13]",
        className,
      )}
    >
      {/* Arcs décoratifs discrets */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-or/10" />
        <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full border border-or/15" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-or/10" />
      </div>

      <div className="relative flex flex-col items-center gap-4 px-5 py-8 text-center">
        {/* Emblème : cercles concentriques + monogramme */}
        <div
          className="relative flex h-24 w-24 shrink-0 items-center justify-center md:h-28 md:w-28"
          aria-hidden
        >
          <span className="absolute inset-0 rounded-full border border-or/30" />
          <span className="absolute inset-[9px] rounded-full border border-or/45" />
          <span className="absolute inset-[18px] rounded-full border border-or/65" />
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-vert">
            <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-creme">
              MUNTU
            </span>
          </span>
        </div>
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-vert/60 md:text-[11px]">
          {label}
        </p>
      </div>
    </div>
  );
}