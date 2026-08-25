import { ArrowRight } from "lucide-react";
import heroBg from "../../assets/images/transmission.png";
import { navigateTo } from "../../utils/navigate";

/**
 * Section 1 — Hero institutionnel du pilier « Transmission du NTU ».
 * Intègre le fil d'Ariane, le repère « Pilier 3 », la fonction du pilier
 * et deux CTA.
 */
export default function TransmissionHero() {
  return (
    <section
      id="transmission-hero"
      className="relative -mx-4 md:-mx-8 lg:-mx-10 -mt-20 md:-mt-24 lg:-mt-28 z-0 overflow-hidden bg-vert-fonce text-white shadow-2xl"
      aria-labelledby="transmission-hero-title"
    >
      {/* Visuel de fond + overlay de lisibilité */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/85" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/55" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-end px-4 pb-10 pt-36 md:px-8 md:pb-14 md:pt-44 lg:justify-start lg:px-10 lg:pb-24 lg:pt-36 xl:pb-28 xl:pt-44">
        <div className="mx-auto w-full max-w-[900px]">
          {/* Fil d'Ariane */}
          <nav
            aria-label="Fil d'Ariane"
            className="mb-6 flex flex-wrap items-center gap-2 font-sans text-[12px] text-white/85 sm:text-xs"
          >
            <a
              href="/"
              onClick={(event) => navigateTo(event, "/")}
              className="transition-colors hover:text-or-clair"
            >
              Accueil
            </a>
            <span className="text-white/50" aria-hidden>
              ›
            </span>
            <span className="text-white/85">Nos piliers</span>
            <span className="text-white/50" aria-hidden>
              ›
            </span>
            <span className="text-white" aria-current="page">
              Transmission du NTU
            </span>
          </nav>

          <p className="font-sans text-sm font-semibold uppercase tracking-[0.35em] text-or-clair">
            Pilier 3
          </p>
          <h1
            id="transmission-hero-title"
            className="mt-6 font-serif text-4xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-[3.35rem] xl:text-6xl"
          >
            <span className="block">Transmission</span>
            <span className="block">du NTU</span>
          </h1>
          <p className="mt-5 font-serif text-lg italic text-or-clair sm:text-xl">
            Restaurer le MUNTU &amp; activer le NTU
          </p>
          <p className="mt-5 max-w-2xl font-sans text-sm font-light leading-relaxed text-white/90 sm:text-base">
            La transmission ne repose pas uniquement sur le partage de
            connaissances&nbsp;: elle transmet une conscience, des valeurs, une capacité de
            discernement et une capacité d&rsquo;action, afin que chacune et chacun devienne, à son
            tour, un maillon vivant et responsable de la chaîne du Muntu.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <a
              href="#transmission-axes"
              className="btn-or inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
            >
              Découvrir le programme
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#transmission-participation"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-vert/70 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-or hover:bg-vert"
            >
              S&rsquo;engager
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}