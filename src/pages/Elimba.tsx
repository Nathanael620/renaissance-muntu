import { ArrowRight } from "lucide-react";
import heroBg from "../assets/images/elimba.png";
import logo from "../assets/icons/elimba.jpeg";
import {
  ElimbaActivites,
  ElimbaDevise,
  ElimbaIdee,
  ElimbaMission,
  ElimbaMotivation,
  ElimbaPhilosophie,
  ElimbaPresentation,
  ElimbaPrincipesDirecteurs,
  ElimbaProblematique,
  ElimbaVision,
  ReturnToNavigation,
} from "../components/elimba";

const pageNavigation = [
  { id: "elimba-hero", label: "Hero" },
  { id: "elimba-objective", label: "Objectif" },
  { id: "elimba-problematique", label: "Problématique" },
  { id: "elimba-motivation", label: "Motivation" },
  { id: "elimba-presentation", label: "Présentation" },
  { id: "elimba-idee", label: "Idée" },
  { id: "elimba-principes", label: "Principes" },
  { id: "elimba-missions", label: "Mission" },
  { id: "elimba-devise", label: "Devise" },
  { id: "elimba-philosophie", label: "Philosophie" },
  { id: "elimba-vision-projet", label: "Vision" },
  { id: "elimba-activites", label: "Activités" },
  { id: "elimba-actions", label: "Actions" },
  { id: "elimba-ressources", label: "Ressources" },
  { id: "elimba-temoignages", label: "Témoignages" },
];

const actions = [
  {
    title: "Rencontres publiques",
    description:
      "Des ateliers, tables rondes et conversations ouvertes pour faire entendre la parole collective.",
  },
  {
    title: "Publications critiques",
    description:
      "Des textes, essais et manifestes qui interrogent les certitudes et nourrissent la pensée.",
  },
  {
    title: "Programmes d’éducation",
    description:
      "Des parcours de formation qui éveillent au courage, à la responsabilité et à la mémoire.",
  },
];

const ressources = [
  "Livre blanc du dialogue",
  "Études sur l’écologie spirituelle",
  "Manifestes de responsabilité citoyenne",
  "Programmes pédagogiques à venir",
];

const temoignage = {
  quote:
    "La vérité est une force douce qui transforme les sociétés lorsqu’elle est accueillie avec respect et lucidité.",
  author: "Un membre du cercle Elimb’a Dikalo",
};

export default function Elimba() {
  return (
    <div className="space-y-14 px-4 py-20 md:px-8 lg:px-10">
      <section
        id="elimba-hero"
        className="relative -mx-4 md:-mx-8 lg:-mx-10 -mt-20 md:-mt-24 lg:-mt-28 z-0 overflow-visible bg-vert-fonce text-white shadow-2xl"
        aria-labelledby="elimba-hero-title"
      >
        <img
          src={heroBg}
          alt="Fond Elimb'a Dikalo"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80" aria-hidden />

        <div className="relative mx-auto grid max-w-[1440px] gap-6 px-6 pt-28 pb-10 md:grid-cols-[minmax(280px,440px)_minmax(0,1fr)] md:items-center md:gap-8 md:pt-32 md:pb-16 lg:px-10 lg:pt-36 lg:pb-14 xl:gap-14">
          <div className="max-w-2xl md:order-last md:ml-6 lg:ml-12 xl:ml-20">
            <p className="font-sans text-xl font-semibold uppercase tracking-[0.18em] text-white sm:text-2xl lg:text-3xl [overflow-wrap:anywhere]">
              ELIMB&rsquo;A DIKALO
            </p>
            <h1
              id="elimba-hero-title"
              className="mt-6 font-serif text-4xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl"
            >
              Pour la Renaissance du Muntu
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
              Placer le dialogue exigeant et la responsabilité collective au cœur de la renaissance.
              Ce pilier fondateur met en lumière les forces qui rendent possible une transformation authentique.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#elimba-objective"
                className="inline-flex items-center justify-center rounded-full bg-or px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-or-clair"
              >
                Voir l’objectif
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </a>
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState({}, "", "/");
                  window.dispatchEvent(new Event("routechange"));
                }}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:border-or hover:text-or"
              >
                Retour à l’accueil
              </a>
            </div>
          </div>

          <aside className="w-full max-w-[460px] rounded-[1.5rem] border border-white/15 bg-white/10 p-4 text-center shadow-lg backdrop-blur-sm md:order-first md:justify-self-center">
            <div className="flex w-full flex-col items-center gap-3 sm:gap-4">
              <div className="w-64 shrink-0 sm:w-72 lg:w-[20rem] xl:w-[22rem]">
                <img
                  src={logo}
                  alt="Logo Elimb'a Dikalo"
                  className="h-auto w-full object-contain"
                />
              </div>

              <p className="max-w-[18rem] font-serif text-sm italic leading-snug text-white/90 sm:text-base">
                Une même terre. Plusieurs racines. Un seul avenir.
              </p>

              <div className="w-full">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-or-clair">
                  Pilier fondateur
                </p>
                <h2 className="mt-2 break-words font-serif text-2xl font-semibold uppercase leading-tight text-white sm:text-3xl [overflow-wrap:anywhere]">
                  Vérité &amp; Dialogue
                </h2>
              </div>

              <div className="w-full space-y-3 text-sm leading-relaxed text-white/85 sm:text-[0.95rem]">
                <p>
                  Elimb&rsquo;a Dikalo est le volet de la renaissance qui interroge, relie et élève par la parole vraie.
                </p>
                <p>
                  Son engagement : écouter les peuples, mesurer les responsabilités et offrir un horizon de conscience partagée.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Mission — placée directement après le héro */}
      <div className="space-y-4"><ElimbaMission /><ReturnToNavigation /></div>

      <section
        id="elimba-objective"
        className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10 lg:py-14"
        aria-labelledby="elimba-objective-title"
      >
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
              Objectif central
            </p>
            <h2
              id="elimba-objective-title"
              className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
            >
              Prévenir les fractures communautaires avant qu’elles ne deviennent des conflits.
            </h2>
            <p className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
              Au lieu d’attendre que les tensions explosent, agir sur les causes profondes : la peur, les préjugés, les rumeurs et les discours de division.
            </p>
          </div>
          <div className="rounded-[2rem] border border-or/20 bg-white p-6 shadow-sm">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-or-clair">
              Message central
            </p>
            <p className="mt-5 font-serif text-lg font-semibold leading-snug text-vert">
              Le problème n’est pas « les autres ».
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-anthracite">
              Le vrai danger est :
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-anthracite">
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
                la division,
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
                l’absence de vision,
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
                la perte du sens communautaire,
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
                la mauvaise gestion de l’héritage,
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
                et la culture de la victimisation.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="elimba-architecture"
        className="rounded-[2rem] bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10"
        aria-labelledby="elimba-architecture-title"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-vert">
                Navigation de la page
              </p>
              <h2
                id="elimba-architecture-title"
                className="mt-3 font-serif text-3xl font-semibold uppercase text-vert sm:text-4xl"
              >
                Repères rapides
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-anthracite/80">
              Explorez chaque temps fort de la démarche Elimb’a Dikalo, de l’intention aux actions concrètes.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pageNavigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group rounded-[1.5rem] border border-or/20 bg-creme-clair p-6 text-left transition hover:border-or hover:bg-or/5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-vert transition group-hover:text-or">
                  {item.label}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-vert text-white">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="font-sans text-sm leading-relaxed text-anthracite/85">
                    Aller à {item.label.toLowerCase()}.
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="space-y-4"><ElimbaProblematique /><ReturnToNavigation /></div>
      <div className="space-y-4"><ElimbaMotivation /><ReturnToNavigation /></div>
      <div className="space-y-4"><ElimbaPresentation /><ReturnToNavigation /></div>
      <div className="space-y-4"><ElimbaIdee /><ReturnToNavigation /></div>
      <div className="space-y-4"><ElimbaPrincipesDirecteurs /><ReturnToNavigation /></div>
      <div className="space-y-4"><ElimbaDevise /><ReturnToNavigation /></div>
      <div className="space-y-4"><ElimbaPhilosophie /><ReturnToNavigation /></div>
      <div className="space-y-4"><ElimbaVision /><ReturnToNavigation /></div>
      <div className="space-y-4"><ElimbaActivites /><ReturnToNavigation /></div>

      <section
        id="elimba-actions"
        className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
        aria-labelledby="elimba-actions-title"
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 id="elimba-actions-title" className="font-serif text-3xl font-semibold uppercase tracking-wide text-vert">
            Actions
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {actions.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-or/20 bg-white p-6 shadow-sm">
                <h3 className="font-serif text-xl font-semibold uppercase text-vert">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-anthracite/85">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ReturnToNavigation />

      <section
        id="elimba-ressources"
        className="rounded-[2rem] bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10"
        aria-labelledby="elimba-ressources-title"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
                Ressources
              </p>
              <h2 id="elimba-ressources-title" className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl">
                Vers un fonds documentaire.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-anthracite/80">
              Ces ressources sont des repères pour comprendre la démarche, nourrir la réflexion et partager les idées du pilier Elimb’a Dikalo.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {ressources.map((item) => (
              <div key={item} className="rounded-[1.75rem] border border-or/20 bg-creme p-6 shadow-sm">
                <div className="mb-4 h-32 rounded-3xl bg-slate-100/80" aria-hidden>
                  <span className="sr-only">Visuel à venir</span>
                </div>
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-vert">
                  {item}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-anthracite/80">
                  Contenu illustratif à venir pour cette ressource.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ReturnToNavigation />

      <section
        id="elimba-temoignages"
        className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
        aria-labelledby="elimba-temoignages-title"
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 id="elimba-temoignages-title" className="font-serif text-3xl font-semibold uppercase tracking-wide text-vert">
            Témoignage
          </h2>
          <div className="mt-8 rounded-[2rem] border border-or/20 bg-white p-10 shadow-sm">
            <p className="font-serif text-xl italic leading-relaxed text-anthracite/90 sm:text-2xl">
              “{temoignage.quote}”
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-vert">
              {temoignage.author}
            </p>
          </div>
        </div>
      </section>
      <ReturnToNavigation />
    </div>
  );
}
