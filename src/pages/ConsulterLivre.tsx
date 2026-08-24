import { ArrowLeft, Eye, ShoppingBag } from "lucide-react";
import { libraryItems } from "../data/libraryData";

/** Navigation interne maison (pushState + routechange + scroll d'ancre). */
function navigate(href: string) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new Event("routechange"));
  const hashIndex = href.indexOf("#");
  if (hashIndex !== -1) {
    const id = href.slice(hashIndex + 1);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
}

/** Ligne d'information de la fiche ouvrage. */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-or/15 py-2">
      <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-anthracite/60">
        {label}
      </dt>
      <dd className="text-right font-sans text-sm font-medium text-anthracite">
        {value}
      </dd>
    </div>
  );
}

/**
 * Page « Consulter un ouvrage » — /bibliotheque/consulter/:id
 * Fiche détaillée d'un livre + visuel de la 4e de couverture
 * (placeholder tant que l'image n'est pas fournie).
 */
export default function ConsulterLivre({ id }: { id: string }) {
  const book = libraryItems.find((item) => item.id === id);

  if (!book) {
    return (
      <div className="px-4 py-32 text-center md:px-8 lg:px-10">
        <p className="font-serif text-2xl font-semibold uppercase tracking-wide text-vert">
          Ouvrage introuvable
        </p>
        <a
          href="/bibliotheque"
          onClick={(e) => {
            e.preventDefault();
            navigate("/bibliotheque");
          }}
          className="btn-or mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wide shadow-md"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Retour à la bibliothèque
        </a>
      </div>
    );
  }

  const priceLabel =
    book.price != null
      ? `${book.price.toLocaleString("fr-FR")} ${book.currency ?? ""}`.trim()
      : "Prix à définir";

  return (
    <div className="space-y-10 px-4 py-20 md:px-8 lg:px-10">
      {/* Fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className="mx-auto max-w-[1200px]">
        <a
          href="/bibliotheque"
          onClick={(e) => {
            e.preventDefault();
            navigate("/bibliotheque");
          }}
          className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wide text-vert transition-colors hover:text-or"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Bibliothèque du Muntu
        </a>
      </nav>

      <section
        className="mx-auto max-w-[1200px] rounded-[2rem] border border-or/25 bg-creme-clair p-6 shadow-sm sm:p-10"
        aria-labelledby="consultation-title"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-12">
          {/* Visuels */}
          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            {/* Couverture avant */}
            <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl border border-or/30 bg-gradient-to-br from-vert-fonce via-vert to-vert-profond p-4 shadow-md">
              <img
                src={book.cover}
                alt={`Couverture de l'ouvrage « ${book.title} »`}
                className="h-full w-full object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)]"
              />
            </div>

            {/* 4e de couverture */}
            <div className="mt-6">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-or-fonce">
                Resumé
              </h3>
              {book.backCover ? (
                <div className="mt-3 flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl border border-or/30 bg-gradient-to-br from-vert-fonce via-vert to-vert-profond p-4 shadow-md">
                  <img
                    src={book.backCover}
                    alt={`4e de couverture de l'ouvrage « ${book.title} »`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : book.backCoverText ? (
                <div className="mt-3 space-y-3 rounded-xl border border-or/25 bg-white/85 p-5">
                  {book.backCoverText
                    .split(/\n\s*\n/)
                    .filter((paragraph) => paragraph.trim())
                    .map((paragraph) => (
                      <p
                        key={paragraph}
                        className="font-sans text-xs leading-relaxed text-anthracite/85"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              ) : (
                <div
                  className="mt-3 flex aspect-[3/4] items-center justify-center rounded-xl border-2 border-dashed border-or/40 bg-white/60 px-6 text-center"
                  role="img"
                  aria-label="Visuel de la 4e de couverture à venir"
                >
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-anthracite/60">
                    Visuel de la 4e de couverture
                    <br />
                    à venir
                  </p>
                </div>
              )}
            </div>
          </div>
{/* Détails */}
          <div className="flex flex-col">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-or-fonce">
              Bibliothèque du Muntu
            </span>
            <h1
              id="consultation-title"
              className="mt-3 font-serif text-3xl font-bold uppercase leading-tight text-vert md:text-4xl"
            >
              {book.title}
            </h1>

            {book.summary ? (
              <p className="mt-5 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
                {book.summary}
              </p>
            ) : (
              <p className="mt-5 font-sans text-sm italic leading-relaxed text-anthracite/70">
                Présentation détaillée de l&apos;ouvrage à venir.
              </p>
            )}

            <dl className="mt-7 space-y-1">
              <InfoRow label="Auteur" value={book.author ?? "À communiquer"} />
              <InfoRow
                label="Langue"
                value={book.language ?? "À communiquer"}
              />
              <InfoRow label="Prix" value={priceLabel} />
              <InfoRow
                label="Éditeur"
                value={book.edition ?? "À communiquer"}
              />
              <InfoRow label="Pages" value={book.pages ?? "À communiquer"} />
              <InfoRow label="ISBN" value={book.isbn ?? "À communiquer"} />
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {book.shopUrl ? (
                <a
                  href={book.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-or inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wide shadow-md transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <ShoppingBag className="h-4 w-4" aria-hidden />
                  Acheter
                </a>
              ) : (
                <div>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title="Achat Chariow — disponible prochainement"
                    className="btn-or inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wide opacity-60 shadow-md"
                  >
                    <ShoppingBag className="h-4 w-4" aria-hidden />
                    Acheter
                  </button>
                  <p className="mt-2 font-sans text-[10px] font-medium uppercase tracking-wide text-anthracite/60">
                    Achat disponible prochainement
                  </p>
                </div>
              )}
              <a
                href="/bibliotheque#nos-livres"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/bibliotheque#nos-livres");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-vert px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-vert transition-colors duration-300 hover:bg-vert hover:text-white"
              >
                <Eye className="h-4 w-4" aria-hidden />
                Retour à la bibliothèque
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}