import { translateContent } from "../i18n/translateContent";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Eye, ShoppingBag } from "lucide-react";
import { libraryItems } from "../data/libraryData";
import { localizedPath, navigateToPath } from "../routing/routes";

/** Navigation interne maison (pushState + routechange + scroll d'ancre). */
function navigate(href: string) {
  navigateToPath(href);
}

/** Ligne d'information de la fiche ouvrage. */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-or/15 py-2">
      <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-anthracite/60">
        {translateContent(label)}
      </dt>
      <dd className="text-right font-sans text-sm font-medium text-anthracite">
        {translateContent(value)}
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
  const { i18n } = useTranslation();
  const book = libraryItems.find((item) => item.id === id);

  useEffect(() => {
    if (!book) {
      document.title = translateContent("Ouvrage introuvable | Bibliothèque du Muntu");
      return;
    }
    document.title = `${translateContent(book.title)} — ${translateContent("Bibliothèque du Muntu")}`;
    const tag = document.querySelector('meta[name="description"]');
    if (tag && book.summary) {
      tag.setAttribute("content", translateContent(book.summary));
    }
  }, [i18n.language, book]);

  if (!book) {
    return (
      <div className="px-4 py-32 text-center md:px-8 lg:px-10">
        <p className="font-serif text-2xl font-semibold uppercase tracking-wide text-vert">
          {translateContent("Ouvrage introuvable ")}</p>
        <a
          href={localizedPath("/bibliotheque")}
          onClick={(e) => {
            e.preventDefault();
            navigate("/bibliotheque");
          }}
          className="btn-or mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wide shadow-md"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {translateContent("Retour à la bibliothèque ")}</a>
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
      <nav aria-label={translateContent("Fil d'Ariane")} className="mx-auto max-w-[1200px]">
        <a
          href={localizedPath("/bibliotheque")}
          onClick={(e) => {
            e.preventDefault();
            navigate("/bibliotheque");
          }}
          className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wide text-vert transition-colors hover:text-or"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {translateContent("Bibliothèque du Muntu ")}</a>
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
                alt={translateContent(`Couverture de l'ouvrage « ${book.title} »`)}
                className="h-full w-full object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)]"
              />
            </div>

            {/* 4e de couverture */}
            <div className="mt-6">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-or-fonce">
                {translateContent("Resumé ")}</h3>
              {book.backCover ? (
                <div className="mt-3 flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl border border-or/30 bg-gradient-to-br from-vert-fonce via-vert to-vert-profond p-4 shadow-md">
                  <img
                    src={book.backCover}
                    alt={translateContent(`4e de couverture de l'ouvrage « ${book.title} »`)}
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
                        {translateContent(paragraph)}
                      </p>
                    ))}
                </div>
              ) : (
                <div
                  className="mt-3 flex aspect-[3/4] items-center justify-center rounded-xl border-2 border-dashed border-or/40 bg-white/60 px-6 text-center"
                  role="img"
                  aria-label={translateContent("Visuel de la 4e de couverture à venir")}
                >
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-anthracite/60">
                    {translateContent("Visuel de la 4e de couverture ")}<br />
                    {translateContent("à venir ")}</p>
                </div>
              )}
            </div>
          </div>
{/* Détails */}
          <div className="flex flex-col">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-or-fonce">
              {translateContent("Bibliothèque du Muntu ")}</span>
            <h1
              id="consultation-title"
              className="mt-3 font-serif text-3xl font-bold uppercase leading-tight text-vert md:text-4xl"
            >
              {translateContent(book.title)}
            </h1>

            {book.summary ? (
              <p className="mt-5 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
                {book.summary}
              </p>
            ) : (
              <p className="mt-5 font-sans text-sm italic leading-relaxed text-anthracite/70">
                {translateContent("Présentation détaillée de l’ouvrage à venir. ")}</p>
            )}

            <dl className="mt-7 space-y-1">
              <InfoRow label={translateContent("Auteur")} value={translateContent(book.author ?? "À communiquer")} />
              <InfoRow
                label={translateContent("Langue")}
                value={translateContent(book.language ?? "À communiquer")}
              />
              <InfoRow label={translateContent("Prix")} value={translateContent(priceLabel)} />
              <InfoRow
                label={translateContent("Éditeur")}
                value={translateContent(book.edition ?? "À communiquer")}
              />
              <InfoRow label={translateContent("Pages")} value={translateContent(book.pages ?? "À communiquer")} />
              <InfoRow label={translateContent("ISBN")} value={translateContent(book.isbn ?? "À communiquer")} />
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
                  {translateContent("Acheter ")}</a>
              ) : (
                <div>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title={translateContent("Achat Chariow — disponible prochainement")}
                    className="btn-or inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wide opacity-60 shadow-md"
                  >
                    <ShoppingBag className="h-4 w-4" aria-hidden />
                    {translateContent("Acheter ")}</button>
                  <p className="mt-2 font-sans text-[10px] font-medium uppercase tracking-wide text-anthracite/60">
                    {translateContent("Achat disponible prochainement ")}</p>
                </div>
              )}
              <a
                href={localizedPath("/bibliotheque#nos-livres")}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/bibliotheque#nos-livres");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-vert px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-vert transition-colors duration-300 hover:bg-vert hover:text-white"
              >
                <Eye className="h-4 w-4" aria-hidden />
                {translateContent("Retour à la bibliothèque ")}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}