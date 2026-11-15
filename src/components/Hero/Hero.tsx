import { translateContent } from "../../i18n/translateContent";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import heroBg from "../../assets/images/optimized/hero.webp";
import academieBg from "../../assets/images/optimized/academie.webp";
import africaBg from "../../assets/images/optimized/Africa.webp";
import bibliothequeBg from "../../assets/images/optimized/bibliotheque.webp";
import elimbaBg from "../../assets/images/optimized/elimba.webp";
import engagementBg from "../../assets/images/optimized/engagement.webp";
import elimbaIcon from "../../assets/icons/optimized/elimba.webp";
import { heroContent } from "../../data/siteData";
import { cn } from "../../utils/cn";
import { navigateTo } from "../../utils/navigate";
import { localizedPath } from "../../routing/routes";
import "./Hero.carousel.css";

const FIRST_IMAGE_DURATION_MS = 15_000;
const SLIDE_DURATION_MS = 10_000;
const TRANSITION_DURATION_MS = 1_200;

const carouselImages = import.meta.glob<string>(
  "../../assets/images/optimized/images_carrousels/*.webp",
  { eager: true, import: "default", query: "?url" },
);

const priorityImages = [
  {
    key: "hero",
    src: heroBg,
    durationMs: FIRST_IMAGE_DURATION_MS,
  },
  { key: "academie", src: academieBg, durationMs: SLIDE_DURATION_MS },
  { key: "africa", src: africaBg, durationMs: SLIDE_DURATION_MS },
  { key: "bibliotheque", src: bibliothequeBg, durationMs: SLIDE_DURATION_MS },
  { key: "elimba", src: elimbaBg, durationMs: SLIDE_DURATION_MS },
  { key: "engagement", src: engagementBg, durationMs: SLIDE_DURATION_MS },
] as const;

const priorityImageNames = new Set([
  "hero.webp",
  "academie.webp",
  "africa.webp",
  "bibliotheque.webp",
  "elimba.webp",
  "engagement.webp",
]);

const additionalImages = Object.entries(carouselImages)
  .filter(([path]) => {
    const fileName = path.split("/").pop()?.toLowerCase();
    return fileName !== undefined && !priorityImageNames.has(fileName);
  })
  .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
  .map(([path, src]) => ({
    key: path,
    src,
    durationMs: SLIDE_DURATION_MS,
  }));

const backgroundImages = [...priorityImages, ...additionalImages];

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
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  const changeImage = (nextIndex: number) => {
    setPreviousIndex(activeIndex);
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timeoutId = window.setTimeout(() => {
      const nextIndex = (activeIndex + 1) % backgroundImages.length;
      setPreviousIndex(activeIndex);
      setActiveIndex(nextIndex);
    }, backgroundImages[activeIndex]?.durationMs ?? SLIDE_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, prefersReducedMotion]);

  useEffect(() => {
    if (previousIndex === null) return;

    const timeoutId = window.setTimeout(() => {
      setPreviousIndex(null);
    }, TRANSITION_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [previousIndex, activeIndex]);

  const showPreviousImage = () => {
    const nextIndex =
      (activeIndex - 1 + backgroundImages.length) %
      backgroundImages.length;

    changeImage(nextIndex);
  };

  const showNextImage = () => {
    const nextIndex = (activeIndex + 1) % backgroundImages.length;

    changeImage(nextIndex);
  };

  return (
    <section
      id="accueil"
      className="relative min-h-[100svh] w-full overflow-hidden bg-vert-fonce"
      aria-labelledby="hero-title"
    >
      {/* Fond image full-bleed — carrousel en fondu derrière le contenu */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" aria-hidden>
          {[previousIndex, activeIndex]
            .filter((index): index is number => index !== null)
            .filter((index, position, indexes) => indexes.indexOf(index) === position)
            .map((index) => {
              const image = backgroundImages[index];

              return (
                <div
                  key={image.key}
                  className={cn(
                    "carousel-bg",
                    index >= priorityImages.length && "carousel-bg--contained",
                    index === activeIndex ? "active" : "inactive",
                  )}
                  style={{
                    backgroundImage: `url("${image.src}")`,
                    transitionDuration: `${TRANSITION_DURATION_MS}ms`,
                  }}
                />
              );
            })}
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

      <div className="pointer-events-none absolute inset-0 z-20">
        <button
          type="button"
          aria-label={translateContent("Image précédente")}
          onClick={showPreviousImage}
          className="pointer-events-auto absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white shadow-lg backdrop-blur-sm transition-colors duration-200 hover:border-or hover:bg-vert-profond/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or sm:left-5"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          aria-label={translateContent("Image suivante")}
          onClick={showNextImage}
          className="pointer-events-auto absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white shadow-lg backdrop-blur-sm transition-colors duration-200 hover:border-or hover:bg-vert-profond/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or sm:right-5"
        >
          <ArrowRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}
