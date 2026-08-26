import { ArrowRight, BookOpen } from "lucide-react";
import type { Manifesto } from "../../data/manifestesData";
import renaissanceLogo from "../../assets/images/1.png";
import elimbaLogo from "../../assets/images/3.png";
import zeroRevengeLogo from "../../assets/icons/zero-revenge-books.jpeg";

/** Navigation interne maison (pushState + routechange). */
function navigate(href: string) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new Event("routechange"));
}

/**
 * Carte d'un manifeste — composition graphique éditoriale (aucune image
 * de couverture n'est utilisée). Le visuel reprend la charte du site :
 * écrin vert profond, filet doré, typographie serif.
 */
export default function ManifestoCard({
  manifesto,
  index,
}: {
  manifesto: Manifesto;
  index?: number;
}) {
  const href = `/manifestes/${manifesto.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-or/25 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-or/50 hover:shadow-[0_20px_40px_-16px_rgba(13,40,24,0.35)]">
      {/* Filet or supérieur */}
      <div
        className="h-1.5 w-full bg-gradient-to-r from-or-fonce via-or to-or-fonce"
        aria-hidden
      />

      {/* Composition éditoriale (document stylisé, sans couverture fictive) */}
      <div className="px-5 pt-5">
        <div className="relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-xl border border-or/30 bg-gradient-to-br from-vert-fonce via-vert to-vert-profond p-6 shadow-md">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 20%, #d4a84b 0%, transparent 45%), radial-gradient(circle at 80% 90%, #f5f1e6 0%, transparent 35%)",
            }}
          />

          {/* Logo Renaissance du Muntu — haut gauche */}
          <img
            src={renaissanceLogo}
            alt="Logo Pour la Renaissance du Muntu"
            className="absolute left-1 top-2 z-10 h-20 w-20 object-contain drop-shadow-md sm:h-24 sm:w-24"
            loading="lazy"
          />

          {/* Logo Elimb'a Dikalo — haut droite */}
          <img
            src={elimbaLogo}
            alt="Logo Elimb'a Dikalo"
            className="absolute right-1 top-2 z-10 h-20 w-20 object-contain drop-shadow-md sm:h-24 sm:w-24"
            loading="lazy"
          />

          <span className="relative mx-auto max-w-full break-words self-center text-center font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-or-clair">
            Manifeste
          </span>

          <div className="relative min-w-0">
            <h3 className="break-words font-serif text-2xl font-bold uppercase leading-tight text-white [overflow-wrap:anywhere]">
              {manifesto.title}
            </h3>
            <p className="mt-3 whitespace-pre-line break-words font-serif text-sm italic leading-snug text-creme [overflow-wrap:anywhere]">
              {manifesto.subtitle}
            </p>
            {manifesto.inspiration ? (
              <p className="mt-4 break-words font-sans text-[10px] uppercase tracking-[0.14em] text-or-clair/90 [overflow-wrap:anywhere]">
                {manifesto.inspiration}
              </p>
            ) : null}
          </div>

          <span className="relative h-px w-12 self-start bg-or/60" aria-hidden />

          {/* Logo Zero Revenge Books — bas droite */}
          <img
            src={zeroRevengeLogo}
            alt="Logo Zero Revenge Books"
            className="absolute bottom-3 right-3 z-10 h-22 w-22 rounded-full bg-white/20 object-contain p-1 shadow-md sm:h-24 sm:w-24 sm:p-1.5"
            loading="lazy"
          />
        </div>
      </div>

      {/* Corps de la carte */}
      <div className="flex flex-1 flex-col items-center px-6 pb-6 pt-5 text-center">
        {index != null ? (
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-or-fonce">
            Manifeste Nº&nbsp;{index + 1}
          </span>
        ) : null}
        {manifesto.badge ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-or/30 bg-or/5 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-or-fonce">
            <BookOpen className="h-3 w-3" aria-hidden />
            {manifesto.badge}
          </span>
        ) : null}

        <a
          href={href}
          onClick={(event) => {
            event.preventDefault();
            navigate(href);
          }}
          className="btn-or mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-sans text-xs font-semibold uppercase tracking-wide shadow-md transition-transform duration-300 hover:-translate-y-0.5"
        >
          Lire le manifeste
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </article>
  );
}