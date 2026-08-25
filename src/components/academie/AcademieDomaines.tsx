import {
  Atom,
  type LucideIcon,
  Brain,
  Compass,
  Globe,
  Landmark,
  Lightbulb,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 4 — Nos domaines de formation.
 * Cartes numérotées 01→08 : numéro, icône, titre, description, lien « Explorer ».
 */
type Domaine = {
  numero: string;
  icone: LucideIcon;
  titre: string;
  description: string;
};

const domaines: Domaine[] = [
  { numero: "01", icone: Compass, titre: "Histoire africaine", description: "Transmettre une mémoire vivante et une fierté des héritages." },
  { numero: "02", icone: Globe, titre: "Cosmologies africaines", description: "Relire les cosmologies pour éclairer les consciences." },
  { numero: "03", icone: Landmark, titre: "Décolonisation", description: "Libérer l'esprit des catégories imposées." },
  { numero: "04", icone: Lightbulb, titre: "Conscience et identité", description: "Affermir la conscience individuelle et collective." },
  { numero: "05", icone: Brain, titre: "Esprit critique", description: "Développer un regard lucide et autonome." },
  { numero: "06", icone: Users, titre: "Leadership", description: "Former et élever des personnes." },
  { numero: "07", icone: Atom, titre: "Culture africaine", description: "Restaurer les valeurs et les références africaines." },
  { numero: "08", icone: Star, titre: "Reconstruction intérieure", description: "Réparer la dignité et l'amour d'agir." },
];

/** Contenu curriculum évolutif : cartes aux dimensions cohérentes. */
export default function AcademieDomaines() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="academie-domaines"
      ref={ref}
      className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="academie-domaines-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Se former & transmettre
        </p>
        <h2
          id="academie-domaines-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Nos domaines de formation
        </h2>

        <div className={cn("mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4", visible && "animate-fade-in-delay-1")}>
          {domaines.map((domaine) => (
            <article
              key={domaine.numero}
              className="group flex h-full flex-col rounded-[1.75rem] border border-or/25 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-vert/10 text-vert">
                  <domaine.icone className="h-6 w-6" aria-hidden />
                </span>
                <span className="font-serif text-2xl font-semibold text-or/70" aria-hidden>
                  {domaine.numero}
                </span>
              </div>
              <h3 className="mt-3 font-serif text-lg font-semibold uppercase leading-snug text-vert">
                {domaine.titre}
              </h3>
              <ul className="mt-3 space-y-1.5 font-sans text-[13px] leading-relaxed text-anthracite/85">
                {domaine.description.split("•").map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#academie-domaines"
                className="mt-4 inline-flex items-center gap-1 rounded-full border border-vert/40 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide transition-colors duration-300 group-hover:border-or group-hover:text-or"
              >
                Explorer
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}