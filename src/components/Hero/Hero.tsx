import { ArrowRight } from "lucide-react";
import heroBg from "../../assets/images/hero.png";
import elimbaIcon from "../../assets/icons/elimba.jpeg";
import elimbaImg from "../../assets/images/elimba.png";
import { heroContent } from "../../data/siteData";
import { cn } from "../../utils/cn";

/**
 * Hero — maquette2
 * Desktop ≥1024 : texte à gauche + carte Elimb'a Dikalo en bas à droite
 * Mobile <768 : image, titre centré, boutons empilés
 */
export default function Hero() {
  const { titleLines, subtitle, body, ctaPrimary, ctaSecondary } = heroContent;

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
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] items-center px-5 py-28 md:px-8 lg:px-10 lg:py-32">
        <div className="w-full lg:max-w-[900px]">
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

          <p className="animate-fade-in-delay-2 mt-6 max-w-2xl font-sans text-[13px] font-light leading-relaxed text-white/90 md:text-sm">
            {body}
          </p>

          <div className="animate-fade-in-delay-3 mt-7 flex flex-col items-start gap-3 sm:flex-row">
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
                "inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-black/25 px-6 py-3.5",
                "font-sans text-xs font-semibold uppercase tracking-wider text-white",
                "backdrop-blur-[2px] transition-colors duration-200 hover:border-or hover:bg-black/40",
              )}
            >
              {ctaSecondary}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        {/* Bloc droit : logos Elimb'a Dikalo (desktop) - plus grands et bien visibles */}
        <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-8 lg:flex z-20">
          <div className="rounded-full border-4 border-or/60 bg-white p-1">
            <img src={elimbaIcon} alt="Elimb'a logo" className="h-44 w-44 object-cover" />
          </div>

          <div className="rounded-xl overflow-hidden border-2 border-white/20 bg-white/10 p-2">
            <img src={elimbaImg} alt="Elimb'a" className="h-56 w-56 object-cover" />
          </div>

          <div className="rounded-full border-4 border-or/60 bg-white p-1">
            <img src={elimbaIcon} alt="Elimb'a logo" className="h-36 w-36 object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
