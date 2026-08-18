import { brand } from "../../data/siteData";
import heroBg from "../../assets/images/leve_de_soleil.png";

/**
 * Phrase fondatrice — citation sur image paysage
 * Affichée en colonne à droite, à côté de ParcoursUtilisateur
 */
export default function CitationFinale() {
  return (
    <div className="flex flex-col h-full">
      <h2 className="px-6 py-6 text-center font-serif text-lg font-semibold uppercase tracking-wide text-dark md:px-10 md:py-8 md:text-xl lg:px-12 lg:py-8 lg:text-2xl">
        NOTRE BOUSSOLE
      </h2>
      <section
        className="relative flex-1 min-h-[280px] overflow-hidden rounded-2xl md:min-h-[320px] lg:min-h-0"
      >
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />

        <div className="relative z-10 flex h-full min-h-[280px] flex-col items-center justify-center px-6 py-10 text-center md:min-h-[320px] md:px-10 lg:min-h-full lg:px-12 lg:py-12">
          <blockquote className="relative max-w-lg">
            <span
              className="absolute -left-1 -top-5 font-serif text-5xl text-or md:-left-4 md:text-6xl"
              aria-hidden
            >
              "
            </span>
            <p className="font-serif text-lg italic leading-relaxed text-white md:text-xl lg:text-2xl">
              {brand.citation}
            </p>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
