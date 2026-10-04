import { translateContent } from "../../i18n/translateContent";
import { ArrowRight, GraduationCap } from "lucide-react";
import heroBg from "../../assets/images/academie.png";
import { navigateTo } from "../../utils/navigate";
import { localizedPath } from "../../routing/routes";

/**
 * Section 1 — Hero institutionnel du pilier « Académie du Muntu ».
 */
export default function AcademieHero() {
  return (
    <section
      id="academie-hero"
      className="relative -mx-4 md:-mx-8 lg:-mx-10 -mt-20 md:-mt-24 lg:-mt-28 z-0 overflow-hidden bg-vert-fonce text-white shadow-2xl"
      aria-labelledby="academie-hero-title"
    >
      {/* Visuel de fond + overlay de lisibilité */}
      <img
        src={heroBg}
        alt={translateContent("")}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-black/30" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/5 to-black/10" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-end px-4 pb-10 pt-36 md:px-8 md:pb-14 md:pt-44 lg:justify-center lg:px-10 lg:pb-16 lg:pt-44 xl:pb-20 xl:pt-52">
        <div className="mx-auto w-full max-w-[920px]">
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
            <span className="text-white/85">{translateContent("Nos piliers")}</span>
            <span className="text-white/50" aria-hidden>
              {translateContent("› ")}</span>
            <span className="text-white" aria-current="page">
              {translateContent("Académie Du Muntu ")}</span>
          </nav>

          <p className="font-sans text-sm font-semibold uppercase tracking-[0.35em] text-or-clair">
            {translateContent("Pilier 4 ")}</p>
          <h1
            id="academie-hero-title"
            className="mt-6 font-serif text-4xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-[3.35rem] xl:text-6xl"
          >
            {translateContent("Académie Du Muntu ")}</h1>
          <p className="mt-5 max-w-2xl font-serif text-lg italic text-or-clair sm:text-xl">
            {translateContent("Histoire, cosmologies et reconstruction intérieure au service d&rsquo;une nouvelle conscience africaine. ")}</p>
          <p className="mt-5 max-w-2xl font-sans text-sm font-light leading-relaxed text-white/90 sm:text-base">
            {translateContent("L&rsquo;Académie du Muntu est l&rsquo;espace de formation, de réflexion et de transmission où la connaissance de l&rsquo;histoire africaine, la culture, la conscience continentale et l&rsquo;esprit critique deviennent des outils de renaissance individuelle et collective. ")}</p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <a
              href="#academie-mission"
              className="btn-or inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
            >
              <GraduationCap className="h-4 w-4" aria-hidden />
              {translateContent("Découvrir l&rsquo;Académie ")}</a>
            <a
              href="#academie-domaines"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-vert/70 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-or hover:bg-vert"
            >
              {translateContent("Explorer les formations ")}<ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}