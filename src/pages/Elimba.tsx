import { ArrowRight } from "lucide-react";
import heroBg from "../assets/images/elimba.png";
import logo from "../assets/icons/elimba.jpeg";

const pageNavigation = [
  { id: "elimba-hero", label: "Hero" },
  { id: "elimba-objective", label: "Objectif" },
  { id: "elimba-principes", label: "Principes" },
  { id: "elimba-missions", label: "Missions" },
  { id: "elimba-actions", label: "Actions" },
  { id: "elimba-ressources", label: "Ressources" },
  { id: "elimba-temoignages", label: "Témoignages" },
];

const principes = [
  {
    label: "Dialogue courageux",
    summary:
      "Oser dire la vérité et écouter l’autre dans le respect des peuples, sans compromis sur l’intégrité.",
  },
  {
    label: "Responsabilité partagée",
    summary:
      "Construire ensemble les conditions d’une renaissance qui engage chaque individu et chaque communauté.",
  },
  {
    label: "Écologie spirituelle",
    summary:
      "Reconnaître la relation entre les êtres, les terres et les mémoires pour une civilisation durable.",
  },
];

const missions = [
  "Valoriser les voix des peuples à travers un dialogue libre et conscient.",
  "Articuler des principes clairs pour une transition éthique des sociétés.",
  "Soutenir des actions éducatives et culturelles ancrées dans la vérité.",
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

        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-[1.2fr_auto] md:items-center md:py-20 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
              ELIMB’A DIKALO
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

          <aside className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm md:max-w-sm">
            <div className="flex items-center gap-6">
                <div className="h-28 w-28 md:h-36 md:w-36 lg:h-56 lg:w-56 overflow-visible rounded-full border-2 border-or/50 bg-white p-1">
                <img src={logo} alt="Logo Elimb'a Dikalo" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-or-clair">Pilier fondateur</p>
                <h2 className="mt-2 font-serif text-xl font-semibold uppercase text-white">
                  Vérité & Dialogue
                </h2>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm text-white/85">
              <p>
                Elimb’a Dikalo est le volet de la renaissance qui interroge, relie et élève par la parole vraie.
              </p>
              <p>
                Son engagement : écouter les peuples, mesurer les responsabilités et offrir un horizon de conscience partagée.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="elimba-objective"
        className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10 lg:py-14"
        aria-labelledby="elimba-objective-title"
      >
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
              Objectif
            </p>
            <h2
              id="elimba-objective-title"
              className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
            >
              Rendre visible la vérité qui transforme.
            </h2>
            <p className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
              Nous voulons faire de la vérité partagée un levier de transformation collective, en donnant aux peuples les moyens de se parler, de se comprendre, et de bâtir des responsabilités communes.
            </p>
          </div>
          <div className="rounded-[2rem] border border-or/20 bg-white p-6 shadow-sm">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-or-clair">
              Pilier clé
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-anthracite">
              <li>
                <span className="font-semibold text-vert">Dialogue</span> — instaurer des échanges honnêtes et respectueux.
              </li>
              <li>
                <span className="font-semibold text-vert">Responsabilité</span> — engager chacun dans la parole et l’action.
              </li>
              <li>
                <span className="font-semibold text-vert">Écologie spirituelle</span> — relier les mémoires, les cultures et les paysages.
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

      <section
        id="elimba-principes"
        className="rounded-[2rem] bg-creme px-6 py-10 shadow-sm sm:px-8 lg:px-10"
        aria-labelledby="elimba-principes-title"
      >
        <div className="mx-auto max-w-[1440px]">
          <h2 id="elimba-principes-title" className="font-serif text-3xl font-semibold uppercase tracking-wide text-vert">
            Principes
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {principes.map((item) => (
              <article key={item.label} className="rounded-[1.75rem] border border-or/20 bg-white p-6 shadow-sm">
                <h3 className="font-serif text-xl font-semibold uppercase text-vert">
                  {item.label}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-anthracite/85">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="elimba-missions"
        className="rounded-[2rem] bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10"
        aria-labelledby="elimba-missions-title"
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
              Missions
            </p>
            <h2 id="elimba-missions-title" className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl">
              Ce que nous portons.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
              Nos missions sont conçues pour traduire le principe en action, semer la pensée critique et établir des ponts entre conscience individuelle et responsabilité collective.
            </p>
          </div>
          <div className="space-y-4 rounded-[1.75rem] border border-or/20 bg-creme p-6">
            {missions.map((item) => (
              <p key={item} className="font-sans text-sm leading-relaxed text-anthracite/85">
                <span className="font-semibold text-vert">•</span> {item}
              </p>
            ))}
          </div>
        </div>
      </section>

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
    </div>
  );
}
