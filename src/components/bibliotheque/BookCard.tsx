import { Eye, ShoppingBag } from "lucide-react";
import type { LibraryItem } from "../../data/libraryData";

/**
 * Carte d'un ouvrage de la Bibliothèque du Muntu — présentation éditoriale.
 *
 * - La couverture conserve ses proportions d'origine (object-contain), posée
 *   dans un écrin vert profond souligné d'un filet doré.
 * - Prix absent => badge « PRIX À DÉFINIR » (aucun prix n'est inventé).
 * - Bouton « ACHETER » : ouvre l'URL Chariow individuelle du livre ; tant que
 *   cette URL n'est pas fournie, il reste désactivé.
 * - Bouton « CONSULTER » : mène à la page détail /bibliotheque/consulter/:id.
 */
export default function BookCard({ book }: { book: LibraryItem }) {
  const hasShopUrl = Boolean(book.shopUrl);

  const priceLabel =
    book.price != null
      ? `${book.price.toLocaleString("fr-FR")} ${book.currency ?? ""}`.trim()
      : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-or/25 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-or/50 hover:shadow-[0_20px_40px_-16px_rgba(13,40,24,0.35)]">
      {/* Filet or supérieur */}
      <div
        className="h-1.5 w-full bg-gradient-to-r from-or-fonce via-or to-or-fonce"
        aria-hidden
      />

      {/* Couverture posée sur écrin vert profond */}
      <div className="px-5 pt-5">
        <div
          className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl border border-or/30 bg-gradient-to-br from-vert-fonce via-vert to-vert-profond p-3 shadow-md"
        >
          {/* Motif trame dorée — décor seulement */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 20%, #d4a84b 0%, transparent 45%), radial-gradient(circle at 80% 90%, #f5f1e6 0%, transparent 35%)",
            }}
          />

          <img
            src={book.cover}
            alt={`Couverture de l'ouvrage « ${book.title} »`}
            className="relative h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02] drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)]"
            loading="lazy"
          />

          {book.language ? (
            <span className="absolute right-2 top-2 rounded-full border border-or/30 bg-creme/95 px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-vert shadow-sm">
              {book.language}
            </span>
          ) : null}
        </div>
      </div>

      {/* Corps de la carte */}
      <div className="flex flex-1 flex-col items-center px-6 pb-6 pt-5 text-center">
        <span className="font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-or-fonce">
          Bibliothèque du Muntu
        </span>

        <h3 className="mt-2 font-serif text-xl font-bold uppercase leading-snug text-vert md:text-[22px]">
          {book.title}
        </h3>

        <div className="mt-2.5 h-px w-12 bg-or/50" aria-hidden />

        <p className="mt-3 font-sans text-sm text-anthracite/85">
          <span className="font-semibold text-vert">Auteur&nbsp;: </span>
          {book.author ?? "À communiquer"}
        </p>

        {book.description ? (
          <p className="mt-3 font-sans text-xs leading-relaxed text-anthracite/75">
            {book.description}
          </p>
        ) : null}

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

        {/* Actions : Acheter (Chariow) + Consulter (page détail) */}
        <div className="mt-5 w-full">
          <div className="grid grid-cols-2 gap-3">
            {hasShopUrl ? (
              <a
                href={book.shopUrl}
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
              href={`/bibliotheque/consulter/${book.id}`}
              onClick={(event) => {
                event.preventDefault();
                window.history.pushState(
                  {},
                  "",
                  `/bibliotheque/consulter/${book.id}`,
                );
                window.dispatchEvent(new Event("routechange"));
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-vert px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-vert transition-colors duration-300 hover:bg-vert hover:text-white"
            >
              <Eye className="h-3.5 w-3.5" aria-hidden />
              Consulter
            </a>
          </div>
          {!hasShopUrl ? (
            <p className="mt-2 text-center font-sans text-[10px] font-medium uppercase tracking-wide text-anthracite/60">
              Achat disponible prochainement
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}