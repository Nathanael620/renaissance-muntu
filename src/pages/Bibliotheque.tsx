import { BookOpen, ExternalLink } from "lucide-react";
import bibliothequeBg from "../assets/images/bibliotheque.png";
import publisherLogo from "../assets/icons/zero-revenge-books.jpeg";
import BookCard from "../components/bibliotheque";
import { ManifestoCard } from "../components/manifestes";
import { CHARIOW_STORE_URL, libraryBooks } from "../data/libraryData";
import { manifestes } from "../data/manifestesData";
import { useFadeIn } from "../hooks/useFadeIn";
import { cn } from "../utils/cn";

/**
 * Page « BIBLIOTHÈQUE DU MUNTU » — vitrine / catalogue des ouvrages.
 *
 * Entièrement front-end (aucune API, aucune base de données).
 * Données centralisées dans src/data/libraryData.ts.
 * - Les prix non fournis sont affichés « PRIX À DÉFINIR ».
 * - Les liens Chariow individuels non fournis désactivent le bouton « LIRE ».
 * - La boutique générale Chariow s'ouvre dans un nouvel onglet.
 */
export default function Bibliotheque() {
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  return (
    <div className="space-y-14 px-4 py-20 md:px-8 lg:px-10">
      {/* ——— Héro ——— */}
      <section
        id="bibliotheque-hero"
        className="relative -mx-4 md:-mx-8 lg:-mx-10 -mt-20 md:-mt-24 lg:-mt-28 z-0 overflow-hidden bg-vert-fonce text-white shadow-2xl"
        aria-labelledby="bibliotheque-hero-title"
      >
        <img
          src={bibliothequeBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-end px-4 pb-12 pt-32 md:px-8 md:pb-16 lg:justify-center lg:px-10 lg:pb-24">
          <div className="grid w-full gap-10 md:grid-cols-[1.2fr_auto] md:items-center md:gap-8">
            <div className="w-full max-w-2xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
              Patrimoine • Transmission • Vision
            </p>
            <h1
              id="bibliotheque-hero-title"
              className="mt-6 font-serif text-4xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl"
            >
              Bibliothèque du Muntu
            </h1>
            <p className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
              Une sélection d&apos;ouvrages et de ressources qui transmettent la
              pensée, la culture, les connaissances et la vision du Muntu.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#nos-livres"
                className="btn-or inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                Parcourir nos livres
              </a>
              <a
                href={CHARIOW_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-vert/70 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-[2px] transition-colors duration-200 hover:border-or hover:bg-vert"
              >
                Visiter la boutique
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          {/* Partenaire éditorial — Zero Revenge Books (en bas du héro) */}
          <aside
            className="mx-auto w-full max-w-xs rounded-xl border border-or/50 bg-vert-profond/85 p-6 text-center shadow-xl backdrop-blur-sm lg:absolute lg:bottom-10 lg:right-12 lg:mx-0"
            aria-label="Maison d'édition partenaire Zero Revenge Books"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-or/60 bg-white">
              <img
                src={publisherLogo}
                alt="Zero Revenge Books — maison d'édition partenaire"
                className="h-full w-full object-contain p-1.5"
              />
            </div>
            <p className="mt-4 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-or-clair">
              Maison d&apos;édition 
            </p>
            <p className="mt-1 font-serif text-lg font-semibold uppercase leading-tight text-white">
              Zero Revenge Books
            </p>
          </aside>
        </div>
        </div>
      </section>

      {/* ——— Introduction ——— */}
      <section
        className="mx-auto max-w-[1440px]"
        aria-labelledby="bibliotheque-intro-title"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
            Un patrimoine à transmettre
          </p>
          <h2
            id="bibliotheque-intro-title"
            className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
          >
            La Bibliothèque du Muntu
          </h2>
          <p className="mt-5 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base">
            La Bibliothèque du Muntu rassemble les ouvrages et les ressources
            qui portent la pensée, la culture, les connaissances et la vision
            du Muntu. Chaque livre est une fenêtre ouverte sur un héritage
            fécond — une invitation à découvrir puis à transmettre ce qui
            nourrit l&apos;âme des peuples.
          </p>
        </div>
      </section>
{/* ——— Nos livres ——— */}
      <section
        id="nos-livres"
        className="scroll-mt-24 rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
        aria-labelledby="nos-livres-title"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex items-center justify-center gap-4 md:mb-12">
            <span
              className="hidden h-px flex-1 max-w-40 bg-or/60 sm:block"
              aria-hidden
            />
            <h2
              id="nos-livres-title"
              className="text-center font-serif text-2xl font-semibold uppercase tracking-wide text-vert md:text-3xl"
            >
              Nos livres
            </h2>
            <span
              className="hidden h-px flex-1 max-w-40 bg-or/60 sm:block"
              aria-hidden
            />
          </div>

          <div
            ref={ref}
            className={cn(
              "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8",
              visible && "animate-fade-in",
            )}
          >
            {libraryBooks.length > 0 ? (
              libraryBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
              <p className="col-span-full text-center font-sans text-sm text-anthracite/70">
                Le catalogue des ouvrages sera bientôt disponible.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ——— Manifestes ——— */}
      <section
        id="nos-manifestes"
        className="scroll-mt-24 rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
        aria-labelledby="bibliotheque-manifestes-title"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex items-center justify-center gap-4 md:mb-12">
            <span
              className="hidden h-px max-w-40 flex-1 bg-or/60 sm:block"
              aria-hidden
            />
            <h2
              id="bibliotheque-manifestes-title"
              className="text-center font-serif text-2xl font-semibold uppercase tracking-wide text-vert md:text-3xl"
            >
              Manifestes
            </h2>
            <span
              className="hidden h-px max-w-40 flex-1 bg-or/60 sm:block"
              aria-hidden
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {manifestes.length > 0 ? (
              manifestes.map((manifesto, index) => (
                <ManifestoCard
                  key={manifesto.slug}
                  manifesto={manifesto}
                  index={index}
                />
              ))
            ) : (
              <p className="col-span-full text-center font-sans text-sm text-anthracite/70">
                La collection de manifestes sera bientôt disponible.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ——— Accès à tous les manifestes ——— */}
      <section
        className="rounded-[2rem] border border-or/40 bg-vert-profond/90 px-6 py-10 shadow-sm sm:px-8 lg:px-10"
        aria-labelledby="tous-les-manifestes-title"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 md:flex-row md:gap-10">
          <div className="max-w-xl text-center md:text-left">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-or-clair">
              Textes fondateurs
            </p>
            <h2
              id="tous-les-manifestes-title"
              className="mt-3 font-serif text-xl font-semibold uppercase tracking-wide text-white md:text-2xl"
            >
              Consulter tous les manifestes
            </h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-white/85">
              Retrouvez la collection complète des manifestes et plongez dans
              chaque texte fondateur du projet.
            </p>
          </div>
          <a
            href="/manifestes"
            onClick={(event) => {
              event.preventDefault();
              window.history.pushState({}, "", "/manifestes");
              window.dispatchEvent(new Event("routechange"));
            }}
            className="btn-or inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
          >
            Voir tous les manifestes
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>

      {/* ——— Boutique Chariow ——— */}
      <section
        className="rounded-[2rem] border border-or/40 bg-vert-profond/90 px-6 py-10 shadow-sm sm:px-8 lg:px-10"
        aria-labelledby="bibliotheque-boutique-title"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 md:flex-row md:gap-10">
          <div className="max-w-xl text-center md:text-left">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-or-clair">
              Notre boutique en ligne
            </p>
            <h2
              id="bibliotheque-boutique-title"
              className="mt-3 font-serif text-xl font-semibold uppercase tracking-wide text-white md:text-2xl"
            >
              La sélection complète
            </h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-white/85">
              Retrouvez tous les ouvrages de la Bibliothèque du Muntu, les
              nouvelles parutions de notre maison d&apos;édition et les
              prochaines sorties sur la boutique Chariow.
            </p>
          </div>
          <a
            href={CHARIOW_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-or inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide shadow-lg"
          >
            Voir tous les livres
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>
    </div>
  );
}