import {
  Compass,
  Eye,
  Handshake,
  PenLine,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 4 — Les 6 axes de transmission.
 * Composition hiérarchique : l'Axe 01 (Formations MUNTU) en carte principale,
 * puis une grille de cartes secondaires pour les axes 02 à 06.
 */

type Axe = {
  numero: string;
  titre: string;
  effetLabel: "Effet MUNTU" | "Effet NTU" | "Effet";
  effet: string;
  icone: LucideIcon;
  elements: string[];
};

const axes: Axe[] = [
  {
    numero: "01",
    titre: "Formations MUNTU",
    effetLabel: "Effet MUNTU",
    effet: "Réconciliation avec soi",
    icone: Users,
    elements: [
      "Programmes de 8 à 12 semaines",
      "Dignité humaine",
      "Identité",
      "Non-violence consciente",
      "Estime de soi",
      "Responsabilité",
    ],
  },
  {
    numero: "02",
    titre: "Ateliers NTU",
    effetLabel: "Effet NTU",
    effet: "Équilibre et lucidité",
    icone: Eye,
    elements: [
      "Exercices de recentrage",
      "Gestion des émotions",
      "Discernement face à la manipulation",
      "Protection mentale et morale",
    ],
  },
  {
    numero: "03",
    titre: "Cercles de parole sécurisés",
    effetLabel: "Effet",
    effet: "Réparation collective",
    icone: Users,
    elements: [
      "Espaces d'expression sans jugement",
      "Partage d'expériences",
      "Transmission orale",
    ],
  },
  {
    numero: "04",
    titre: "Éducation critique & historique",
    effetLabel: "Effet",
    effet: "Autonomie intellectuelle",
    icone: Compass,
    elements: [
      "Décolonisation de l'esprit",
      "Compréhension des mécanismes de domination",
      "Analyse des modèles imposés",
    ],
  },
  {
    numero: "05",
    titre: "Écriture, manifeste & engagement",
    effetLabel: "Effet",
    effet: "Passage de la conscience à l'action",
    icone: PenLine,
    elements: [
      "Rédaction de manifestes personnels",
      "Engagement citoyen",
      "Projets communautaires",
    ],
  },
  {
    numero: "06",
    titre: "Accompagnement & mentorat",
    effetLabel: "Effet",
    effet: "Durabilité",
    icone: Handshake,
    elements: [
      "Suivi individuel",
      "Encadrement de projets",
      "Mise en réseau",
    ],
  },
];

/** Carte principale (Axe 01) sur fond vert profond. */
function AxePrincipal({ axe }: { axe: Axe }) {
  const Icon = axe.icone;
  return (
    <article className="relative h-full overflow-hidden rounded-[1.75rem] border border-or/35 bg-vert-profond/95 p-6 shadow-md sm:p-8">
      <span className="absolute right-6 top-6 font-serif text-5xl font-semibold text-or-clair/40" aria-hidden>
        {axe.numero}
      </span>
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-or/20 text-or-clair">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-or-clair">
          Axe principal
        </p>
      </div>
      <h3 className="mt-4 font-serif text-2xl font-semibold uppercase leading-tight text-white">
        {axe.titre}
      </h3>
      <ul className="mt-5 grid gap-2.5">
        {axe.elements.map((elem) => (
          <li key={elem} className="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-white/90">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
            {elem}
          </li>
        ))}
      </ul>
      <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-or/50 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-or-clair">
        {axe.effetLabel}
        <span className="text-white/90">&nbsp;&bull;&nbsp;{axe.effet}</span>
      </p>
    </article>
  );
}

/** Carte secondaire (Axes 02 à 06). */
function AxeSecondaire({ axe }: { axe: Axe }) {
  const Icon = axe.icone;
  return (
    <article className="group flex h-full flex-col rounded-[1.5rem] border border-or/25 bg-creme-clair p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-vert/10 text-vert">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="font-serif text-2xl font-semibold text-or/70" aria-hidden>
          {axe.numero}
        </span>
      </div>
      <h3 className="mt-3 font-serif text-lg font-semibold uppercase leading-snug text-vert">
        {axe.titre}
      </h3>
      <ul className="mt-3 space-y-1.5 font-sans text-[13px] leading-relaxed text-anthracite/85">
        {axe.elements.map((elem) => (
          <li key={elem} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-or/70" aria-hidden />
            {elem}
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-or/20 pt-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-vert">
        {axe.effetLabel}
        <span className="text-or-fonce">&nbsp;&bull;&nbsp;{axe.effet}</span>
      </p>
    </article>
  );
}

export default function TransmissionAxes() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="transmission-axes"
      ref={ref}
      className="rounded-[2rem] bg-creme px-6 py-12 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="transmission-axes-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Le programme
        </p>
        <h2
          id="transmission-axes-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Les 6 axes de transmission
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-anthracite/80 lg:mt-4">
          Six axes complémentaires forment un parcours de restauration intérieure,
          de discernement et de passage à l&rsquo;action.
        </p>

        <div className={cn("mt-10 grid gap-8 items-stretch md:grid-cols-2 xl:grid-cols-3", visible && "animate-fade-in-delay-1")}>
          {axes.map((axe, index) =>
            index === 0 ? (
              <div key={axe.numero} className="md:col-span-2 xl:col-span-2">
                <AxePrincipal axe={axe} />
              </div>
            ) : (
              <AxeSecondaire key={axe.numero} axe={axe} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}