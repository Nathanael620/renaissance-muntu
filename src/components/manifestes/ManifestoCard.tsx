import { ArrowRight, BookOpen, Eye, ShoppingBag } from "lucide-react";
import renaissanceLogo from "../../assets/images/3.png";
import elimbaLogo from "../../assets/images/1.png";
import publisherLogo from "../../assets/icons/zero-revenge-books.jpeg";
import type { Manifesto } from "../../data/manifestesData";

/** Navigation interne maison (pushState + routechange). */
function navigate(href: string) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new Event("routechange"));
}

/**
 * Carte d'un manifeste — composition graphique éditoriale (aucune image
 * de couverture n'est utilisée). Le visuel reprend la charte du site :
 * écrin vert profond, filet doré, typographie serif.
 *
 * - Manifeste payant (`paywall: true`) : prix affiché (ou « PRIX À DÉFINIR »)
 *   + bouton « ACHETER » (boutique Chariow) + bouton « LIRE UN EXTRAIT ».
 * - Manifeste gratuit : bouton « LIRE LE MANIFESTE » unique.
 */
export default function ManifestoCard({
  manifesto,
  index,
}: {
  manifesto: Manifesto;
  index?: number;
}) {
  const href = `/manifestes/${manifesto.slug}`;
  const isPaywalled = manifesto.paywall === true;
  const hasShopUrl = Boolean(manifesto.shopUrl);

  const priceLabel =
    manifesto.price != null
      ? `${manifesto.price.toLocaleString("fr-FR")} ${manifesto.currency ?? ""}`.trim()
      : null;

  const readLabel = isPaywalled ? "Lire un extrait" : "Lire le manifeste";

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

          {/* Coins supérieurs : Renaissance du Muntu + Elimb'a Dikalo */}
          <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-2">
            <div className="flex h-20 w-20 items-center justify-center bg-transparent p-0 shadow-none sm:h-24 sm:w-24 lg:h-28 lg:w-28">
              <img
                src={renaissanceLogo}
                alt="Logo Pour la Renaissance du Muntu"
                className="h-full w-full object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.22)]"
              />
            </div>
            <div className="flex h-20 w-20 items-center justify-center bg-transparent p-0 shadow-none sm:h-24 sm:w-24 lg:h-28 lg:w-28">
              <img
                src={elimbaLogo}
                alt="Logo Elimb'a Dikalo"
                className="h-full w-full object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.22)]"
              />
            </div>
          </div>

          {/* Coin inférieur droit : maison d'édition */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center justify-end">
            <div className="flex h-14 w-14 items-center justify-center bg-transparent p-0 shadow-none sm:h-16 sm:w-16 lg:h-20 lg:w-20">
              <img
                src={publisherLogo}
                alt="Logo Zero Revenge Books — maison d'édition"
                className="h-full w-full object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.22)]"
              />
            </div>
          </div>

          <span className="relative break-words font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-or-clair">
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

          <span className="relative h-px w-12 bg-or/60" aria-hidden />
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

        {isPaywalled ? (
          <>
            {/* Prix */}
            <div className="mt-auto w-full pt-5">
              {priceLabel ? (
                <p className="inline-flex items-center rounded-full border border-or/30 bg-or/5 px-4 py-1.5 font-serif text-xl font-bold text-or-fonce">
                  {priceLabel}
                </p>
              ) : (
                <p className="inline-flex items-center rounded-full border border-or-fonce/40 bg-or/10 px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-or-fonce">
                  Prix à définir
                </p>
              )}
            </div>

            {/* Actions : Acheter (Chariow) + Lire un extrait (page détail) */}
            <div className="mt-5 w-full">
              <div className="grid grid-cols-2 gap-3">
                {hasShopUrl ? (
                  <a
                    href={manifesto.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-or inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide shadow-md transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                    Acheter
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title="Achat Chariow — disponible prochainement"
                    className="btn-or inline-flex cursor-not-allowed items-center justify-center gap-1.5 rounded-full px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide opacity-60 shadow-md"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                    Acheter
                  </button>
                )}
                <a
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(href);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-vert px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-vert transition-colors duration-300 hover:bg-vert hover:text-white"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden />
                  {readLabel}
                </a>
              </div>
              {!hasShopUrl ? (
                <p className="mt-2 text-center font-sans text-[10px] font-medium uppercase tracking-wide text-anthracite/60">
                  Achat disponible prochainement
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <a
            href={href}
            onClick={(event) => {
              event.preventDefault();
              navigate(href);
            }}
            className="btn-or mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-sans text-xs font-semibold uppercase tracking-wide shadow-md transition-transform duration-300 hover:-translate-y-0.5"
          >
            {readLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}