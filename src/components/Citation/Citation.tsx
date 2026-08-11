import { brand } from "../../data/siteData";

/**
 * Citation fondatrice — bandeau vert profond + guillemets or (maquette / DCFT §6.5)
 */
export default function Citation() {
  return (
    <section
      className="bg-creme px-4 py-8 md:px-8 md:py-2 lg:px-10"
      aria-label="Citation fondatrice"
    >
      <blockquote className="relative mx-auto flex max-w-5xl items-center justify-center gap-4 rounded-xl bg-vert px-6 py-8 md:gap-8 md:px-6 md:py-5">
        <span
          className="select-none font-serif text-5xl leading-none text-or md:text-7xl"
          aria-hidden
        >
          “
        </span>
        <p className="text-center font-serif text-base italic leading-relaxed text-white md:text-xl lg:text-2xl">
          {brand.citation}
        </p>
        <span
          className="select-none font-serif text-5xl leading-none text-or md:text-7xl"
          aria-hidden
        >
          ”
        </span>
      </blockquote>
    </section>
  );
}
