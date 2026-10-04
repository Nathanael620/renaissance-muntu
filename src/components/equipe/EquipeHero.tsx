import { translateContent } from "../../i18n/translateContent";
import { ArrowRight, Users } from "lucide-react";
import { navigateTo } from "../../utils/navigate";
import { localizedPath } from "../../routing/routes";
import EquipeCarousel from "./EquipeCarousel";

/**
 * Section 1 — Hero institutionnel « Notre Équipe ».
 *
 * Le fond est une composition graphique abstraite (cercles concentriques or).
 * À droite (desktop) / sous le contenu (mobile), un carrousel institutionnel
 * présente automatiquement les photographies des membres renseignées dans
 * `equipeData.ts` ; tant qu'aucune photo officielle n'est fournie, un cadre
 * élégant « Photographie à venir » est affiché.
 */
export default function EquipeHero() {
  return (
    <section
      id="equipe-hero"
      className="relative -mx-4 md:-mx-8 lg:-mx-10 -mt-20 md:-mt-24 lg:-mt-28 z-0 overflow-hidden bg-vert-fonce text-white shadow-2xl"
      aria-labelledby="equipe-hero-title"
    >
      {/* Fond graphique abstrait — aucune image externe, aucune fausse photo */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-or/15" />
        <div className="absolute -right-24 -top-24 h-[22rem] w-[22rem] rounded-full border border-or/15" />
        <div className="absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full border border-or/10" />
        <div className="absolute -bottom-36 -left-20 h-[20rem] w-[20rem] rounded-full border border-or/10" />
      </div>
      {/* Overlays de lisibilité */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-end px-4 pb-10 pt-32 md:px-8 md:pb-14 md:pt-40 lg:justify-center lg:px-10 lg:pb-16 lg:pt-36">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:gap-16">
          {/* Colonne éditoriale */}
          <div className="max-w-2xl">
            {/* Fil d'Ariane */}
            <nav
              aria-label={translateContent("Fil d'Ariane")}
              className="mb-6 flex flex-wrap items-center gap-2 font-sans text-[12px] text-white/85 sm:text-xs"
            >
              <a
                href={localizedPath("/")}
                onClick={(event) => navigateTo(event, "/")}
                className="transition-colors hover:text-or-clair"
              >
                {translateContent("Accueil ")}</a>
              <span className="text-white/50" aria-hidden>
                {translateContent("› ")}</span>
              <span className="text-white/85">{translateContent("L&rsquo;Institut")}</span>
              <span className="text-white/50" aria-hidden>
                {translateContent("› ")}</span>
              <span className="text-white" aria-current="page">
                {translateContent("Notre Équipe ")}</span>
            </nav>

            <p className="font-sans text-sm font-semibold uppercase tracking-[0.35em] text-or-clair">
              {translateContent("Pour la Renaissance du Muntu ")}</p>
            <h1
              id="equipe-hero-title"
              className="mt-6 font-serif text-4xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-[3.35rem] xl:text-6xl"
            >
              {translateContent("Notre Équipe ")}</h1>
            <p className="mt-5 font-serif text-lg italic text-or-clair sm:text-xl">
              {translateContent("Des femmes et des hommes engagés au service d&rsquo;une vision commune. ")}</p>
            <p className="mt-5 max-w-2xl font-sans text-sm font-light leading-relaxed text-white/90 sm:text-base">
              {translateContent("Derrière toute vision se trouve un collectif qui la porte, la transmet et la fait vivre. L&rsquo;équipe du mouvement réunit des parcours complémentaires, une même exigence intellectuelle et une même volonté de servir la renaissance des consciences, des peuples et de la civilisation. ")}</p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-start">
              <a
                href="#equipe-membres"
                className="btn-or inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
              >
                {translateContent("Découvrir l&rsquo;équipe ")}<ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#equipe-cta"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-vert/70 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-or hover:bg-vert"
              >
                <Users className="h-4 w-4" aria-hidden />
                {translateContent("Rejoindre la dynamique ")}</a>
            </div>
          </div>

          {/* Carrousel des membres — remplace l'ancienne zone photo réservée */}
          <div className="mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none">
            <EquipeCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}