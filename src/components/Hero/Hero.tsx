import { ArrowRight } from "lucide-react";
import heroBg from "../../assets/images/hero.png";
import elimbaIcon from "../../assets/icons/elimba.jpeg";
import { heroContent } from "../../data/siteData";
import { cn } from "../../utils/cn";
import { navigateTo } from "../../utils/navigate";

/**
 * Hero — maquette2
 * Desktop ≥1024 : texte à gauche + carte Elimb'a Dikalo en bas à droite
 * Mobile <768 : image, titre centré, boutons empilés
 */
export default function Hero() {
  const { titleLines, subtitle, body, ctaPrimary, ctaSecondary, pillarCard } =
    heroContent;

  return (
    <section
      id="accueil"
      className="relative min-h-[100svh] w-full overflow-hidden bg-vert-fonce"
      aria-labelledby="hero-title"
    >
      {/* Fond image full-bleed */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover object-[62%_center] md:object-center"
          fetchPriority="high"
        />
        {/* Overlay lisibilité — plus dense à gauche (desktop) */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-10 pt-28 md:px-8 md:pb-14 md:pt-32 lg:justify-center lg:px-10 lg:pb-16 lg:pt-28">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
          {/* ——— Contenu texte ——— */}
          <div className="max-w-xl text-center lg:text-left">
            <h1
              id="hero-title"
              className="animate-fade-in font-serif text-[2rem] font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-4xl md:text-5xl lg:text-[3.35rem] xl:text-[3.75rem]"
            >
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="animate-fade-in-delay-1 mt-5 font-sans text-sm font-medium leading-relaxed text-or-clair md:text-base lg:mt-6 lg:text-[1.05rem]">
              {subtitle}
            </p>

            <p className="animate-fade-in-delay-2 mx-auto mt-4 max-w-md font-sans text-[13px] font-light leading-relaxed text-white/90 md:text-sm lg:mx-0 lg:mt-5 lg:max-w-lg">
              {body}
            </p>

            {/* Boutons CTA */}
            <div className="animate-fade-in-delay-3 mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#vision"
                className={cn(
                  "btn-or inline-flex items-center justify-center rounded-md px-6 py-3.5",
                  "font-sans text-xs font-semibold uppercase tracking-wider",
                )}
              >
                {ctaPrimary}
              </a>
              <a
                href="#piliers"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-vert/70 px-6 py-3.5",
                  "font-sans text-xs font-semibold uppercase tracking-wider text-white",
                  "backdrop-blur-[2px] transition-colors duration-200 hover:border-or hover:bg-vert",
                )}
              >
                {ctaSecondary}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          {/* ——— Carte pilier fondateur (desktop / tablette) ——— */}
          <aside
            className={cn(
              "mx-auto w-full max-w-md rounded-xl border border-or/50 bg-vert-profond/85 p-4 shadow-xl backdrop-blur-sm",
              "animate-fade-in-delay-3 lg:mx-0 lg:mb-2 lg:max-w-sm",
            )}
            aria-label="Pilier fondateur Elimb'a Dikalo"
          >
            <div className="flex items-start gap-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-or/60 bg-white">
                <img
                  src={elimbaIcon}
                  alt=""
                  className="h-full w-full object-cover object-left"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-or-clair">
                  {pillarCard.label}
                </p>
                <h2 className="mt-0.5 font-serif text-lg font-semibold uppercase leading-tight text-white md:text-xl">
                  {pillarCard.title}
                </h2>
                <p className="mt-1 font-sans text-xs italic text-white/80">
                  {pillarCard.tagline}
                </p>
                <p className="mt-2 font-sans text-[9px] font-medium uppercase tracking-wide text-white/70">
                  {pillarCard.keywords}
                </p>
                <a
                  href="/elimba"
                  onClick={(event) => navigateTo(event, "/elimba")}
                  className="btn-or mt-3 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-wide"
                >
                  {pillarCard.cta}
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}