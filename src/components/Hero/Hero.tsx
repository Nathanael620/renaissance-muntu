import { translateContent } from "../../i18n/translateContent";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import heroBg from "../../assets/images/hero.png";
import academieBg from "../../assets/images/academie.png";
import africaBg from "../../assets/images/Africa.png";
import bibliothequeBg from "../../assets/images/bibliotheque.png";
import elimbaBg from "../../assets/images/elimba.png";
import engagementBg from "../../assets/images/engagement.png";
import elimbaIcon from "../../assets/icons/elimba.jpeg";
import { heroContent } from "../../data/siteData";
import { cn } from "../../utils/cn";
import { navigateTo } from "../../utils/navigate";
import { localizedPath } from "../../routing/routes";
import "./Hero.carousel.css";

const FIRST_IMAGE_DURATION_MS = 60_000;
const SLIDE_DURATION_MS = 30_000;
const TRANSITION_DURATION_MS = 1_200;

const backgroundImages = [
  {
    key: "hero",
    src: heroBg,
    durationMs: FIRST_IMAGE_DURATION_MS,
  },
  {
    key: "academie",
    src: academieBg,
    durationMs: SLIDE_DURATION_MS,
  },
  {
    key: "africa",
    src: africaBg,
    durationMs: SLIDE_DURATION_MS,
  },
  {
    key: "bibliotheque",
    src: bibliothequeBg,
    durationMs: SLIDE_DURATION_MS,
  },
  {
    key: "elimba",
    src: elimbaBg,
    durationMs: SLIDE_DURATION_MS,
  },
  {
    key: "engagement",
    src: engagementBg,
    durationMs: SLIDE_DURATION_MS,
  },
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);

    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    }

    query.addListener(onChange);
    return () => query.removeListener(onChange);
  }, []);

  return reduced;
}

/**
 * Hero — maquette2
 * Desktop ≥1024 : texte à gauche + carte Elimb'a Dikalo en bas à droite
 * Mobile <768 : image, titre centré, boutons empilés
 */
export default function Hero() {
  const { titleLines, subtitle, body, ctaPrimary, ctaSecondary, pillarCard } =
    heroContent;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex(
        (currentIndex) => (currentIndex + 1) % backgroundImages.length,
      );
    }, backgroundImages[activeIndex]?.durationMs ?? SLIDE_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, prefersReducedMotion]);

  return (
    <section
      id="accueil"
      className="relative min-h-[100svh] w-full overflow-hidden bg-vert-fonce"
      aria-labelledby="hero-title"
    >
      {/* Fond image full-bleed — carrousel en fondu derrière le contenu */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" aria-hidden>
          {backgroundImages.map((image, index) => (
            <div
              key={image.key}
              className={cn(
                "carousel-bg",
                index === activeIndex ? "active" : "inactive",
              )}
              style={{
                backgroundImage: `url(${image.src})`,
                transitionDuration: `${TRANSITION_DURATION_MS}ms`,
              }}
            />
          ))}
        </div>

        {/* Overlay lisibilité — plus dense à gauche (desktop) */}
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-black/20 to-black/5"
          aria-hidden
        />

        <div
          className="absolute inset-0 z-[1] bg-gradient-to-t from-black/35 via-transparent to-black/10"
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
                  {translateContent(line)}
                </span>
              ))}
            </h1>

            <p className="animate-fade-in-delay-1 mt-5 font-sans text-sm font-medium leading-relaxed text-or-clair md:text-base lg:mt-6 lg:text-[1.05rem]">
              {translateContent(subtitle)}
            </p>

            <p className="animate-fade-in-delay-2 mx-auto mt-4 max-w-md font-sans text-[13px] font-light leading-relaxed text-white/90 md:text-sm lg:mx-0 lg:mt-5 lg:max-w-lg">
              {translateContent(body)}
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
                {translateContent(ctaPrimary)}
              </a>

              <a
                href="#piliers"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-vert/70 px-6 py-3.5",
                  "font-sans text-xs font-semibold uppercase tracking-wider text-white",
                  "backdrop-blur-[2px] transition-colors duration-200 hover:border-or hover:bg-vert",
                )}
              >
                {translateContent(ctaSecondary)}
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
            aria-label={translateContent("Pilier fondateur Elimb'a Dikalo")}
          >
            <div className="flex items-start gap-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-or/60 bg-white">
                <img
                  src={elimbaIcon}
                  alt={translateContent("")}
                  className="h-full w-full object-cover object-left"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-or-clair">
                  {translateContent(pillarCard.label)}
                </p>

                <h2 className="mt-0.5 font-serif text-lg font-semibold uppercase leading-tight text-white md:text-xl">
                  {translateContent(pillarCard.title)}
                </h2>

                <p className="mt-1 font-sans text-xs italic text-white/80">
                  {translateContent(pillarCard.tagline)}
                </p>

                <p className="mt-2 font-sans text-[9px] font-medium uppercase tracking-wide text-white/70">
                  {translateContent(pillarCard.keywords)}
                </p>

                <a
                  href={localizedPath("/elimba")}
                  onClick={(event) => navigateTo(event, "/elimba")}
                  className="btn-or mt-3 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-wide"
                >
                  {translateContent(pillarCard.cta)}
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
