import {
  BookOpen,
  GraduationCap,
  Landmark,
  Lightbulb,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 2 — Pourquoi l'Académie Muntu ?
 * Concepts présentés sous forme de cartes élégantes.
 */
type Concept = {
  icone: LucideIcon;
  titre: string;
  description: string;
};

const concepts: Concept[] = [
  {
    icone: GraduationCap,
    titre: "Formation",
    description:
      "Des parcours structurés pour transmettre une mémoire, une méthode et une exigence.",
  },
  {
    icone: Lightbulb,
    titre: "Conscience",
    description:
      "Éveiller la conscience historique et la responsabilité africaine.",
  },
  {
    icone: BookOpen,
    titre: "Transmission",
    description:
      "Faire circuler les savoirs et les expériences entre générations.",
  },
  {
    icone: Landmark,
    titre: "Décolonisation",
    description:
      "Libérer l'esprit des schémas hérités de la colonisation.",
  },
  {
    icone: Users,
    titre: "Leadership",
    description:
      "Préparer des femmes et des hommes capables de porter une vision.",
  },
  {
    icone: Target,
    titre: "Reconstruction intérieure",
    description:
      "Réparer l'estime de soi, l'identité et le goût d'agir.",
  },
];

export default function AcademieRaisonEtre() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="academie-raison-ettre"
      ref={ref}
      className="rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="academie-raison-ettre-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Comprendre
        </p>
        <h2
          id="academie-raison-ettre-title"
          className="mt-4 font-serif text-2xl font-semibold uppercase tracking-wide text-vert sm:text-3xl"
        >
          Pourquoi l&rsquo;Académie Muntu&nbsp;?
        </h2>

        <div className={cn("mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3", visible && "animate-fade-in-delay-1")}>
          {concepts.map((concept) => (
            <article
              key={concept.titre}
              className="flex h-full flex-col rounded-[1.5rem] border border-or/25 bg-creme p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-vert/10 text-vert">
                  <concept.icone className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-serif text-lg font-semibold uppercase leading-snug text-vert">
                  {concept.titre}
                </h3>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-anthracite/85">
                {concept.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}