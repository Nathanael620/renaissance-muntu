import { brand } from "../../data/siteData";
import heroBg from "../../assets/images/hero.png";

/**
 * Phrase fondatrice — citation sur image paysage (maquette)
 */
export default function CitationFinale() {
  return (
    <section
      className="relative overflow-hidden px-4 py-10 md:px-8 lg:px-10"
      aria-label="Phrase fondatrice"
    >
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl">
        <div className="relative min-h-[240px] md:min-h-[320px] lg:min-h-[380px]">
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden />

          <div className="relative z-10 flex h-full min-h-[240px] flex-col items-center justify-center px-6 py-12 text-center md:min-h-[320px] md:px-16 lg:min-h-[380px]">
            <p className="mb-2 font-serif text-sm uppercase tracking-[0.2em] text-or-clair">
              Phrase fondatrice
            </p>
            <blockquote className="relative max-w-3xl">
              <span
                className="absolute -left-2 -top-6 font-serif text-6xl text-or md:-left-8 md:text-8xl"
                aria-hidden
              >
                “
              </span>
              <p className="font-serif text-xl italic leading-relaxed text-white md:text-2xl lg:text-3xl">
                {brand.citation}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
