import { ArrowDown } from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 3 — Le chemin MUNTU → NTU.
 * Représentation visuelle (interprétation de la logique du document) du parcours
 * de restauration et d'activation. Aucune doctrine nouvelle n'est affirmée.
 */
const chemin = [
  {
    label: "MUNTU",
    detail:
      "L’être intérieur : sa dignité, son identité et sa valeur première.",
  },
  {
    label: "Restauration de l’être",
    detail:
      "Rétablir la conscience de soi et désamorcer le complexe d’infériorité.",
  },
  {
    label: "Conscience",
    detail:
      "Éveiller le discernement, l’attention et la capacité de regard critique.",
  },
  {
    label: "Transmission",
    detail:
      "Partager, témoigner, transmettre ce qui a été restauré, intérieur et valeurs.",
  },
  {
    label: "NTU",
    detail:
      "La force vitale activée : stabilité, juste distance face aux influences.",
  },
  {
    label: "Équilibre • Lucidité • Action",
    detail:
      "Une posture d’être équilibrée qui rend capable d’agir librement et durablement.",
  },
];

export default function MuntuNtuSection() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="muntu-ntu"
      ref={ref}
      className="rounded-[20px] bg-vert-profond px-6 py-12 text-white shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="muntu-ntu-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-or-clair">
            Le cœur du pilier
          </p>
          <h2
            id="muntu-ntu-title"
            className="mt-3 font-serif text-3xl font-semibold uppercase tracking-wide text-white sm:text-4xl"
          >
            De MUNTU à NTU
          </h2>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/80 sm:text-base">
            Ce schéma restitue visuellement la logique du pilier : restaurer
            l&rsquo;intérieur pour activer une force de vie lucide et responsable.
          </p>
        </div>

        <div className={cn("mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center", visible && "animate-fade-in-delay-1")}>
          <div className="space-y-5 font-sans text-sm leading-relaxed text-white/85 sm:text-base">
            <p>
              Le Muntu désigne l&rsquo;être : sa dignité d&rsquo;origine, son identité,
              sa valeur d&rsquo;humain. Le NTU désigne la force de vie qui, lorsqu&rsquo;elle est
              restaurée puis transmise, devient discernement, équilibre et action juste.
            </p>
            <p>
              Toute la transmission repose sur ce passage : réparer ce qui a été
              dévalué pour faire renaître la capacité d&rsquo;agir. C&rsquo;est ce mouvement, du
              MUNTU intérieur au NTU transmis, que ce pilier accompagne.
            </p>
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 bottom-0 top-6 left-[1.1875rem] w-px bg-or/35" aria-hidden />
            <ol className="relative space-y-5" aria-label="Parcours de MUNTU vers NTU">
              {chemin.map((etape, index) => (
                <li key={etape.label} className="relative flex items-start gap-6">
                  <span
                    className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-or/70 bg-vert-profond/50 font-sans text-xs font-bold text-or-clair"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold uppercase text-white">
                      {etape.label}
                    </h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-white/85">
                      {etape.detail}
                    </p>
                  </div>
                  {index < chemin.length - 1 && (
                    <ArrowDown
                      className="ml-auto h-4 w-4 shrink-0 text-or-clair/60"
                      aria-hidden
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}