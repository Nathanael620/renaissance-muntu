import { useMemo, useState } from "react";
import { ArrowLeft, Check, Share2 } from "lucide-react";
import type { Manifesto, ManifestoBlock } from "../../data/manifestesData";
import ManifestoProgress from "./ManifestoProgress";
import ManifestoToc, { type ManifestoTocItem } from "./ManifestoToc";

/** Navigation interne maison (pushState + routechange). */
function navigate(href: string) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new Event("routechange"));
}

/** Titre de section (h2) avec numéro romain éventuel. */
function SectionHeading({
  id,
  section,
}: {
  id: string;
  section: { number?: string; title: string };
}) {
  return (
    <div className="flex items-center gap-4">
      <h2
        id={id}
        className="scroll-mt-28 flex flex-wrap items-baseline gap-2 font-serif text-2xl font-semibold uppercase tracking-wide text-vert sm:text-3xl"
      >
        {section.number ? (
          <span className="text-or-fonce" aria-hidden>
            {section.number}.
          </span>
        ) : null}
        {section.title}
      </h2>
      <span className="hidden h-px flex-1 bg-or/40 sm:block" aria-hidden />
    </div>
  );
}

/** Rendu d'un bloc de contenu — fidèle au document source. */
function renderBlock(block: ManifestoBlock, index: number) {
  const key = `${index}-${block.type}`;
  if (block.type === "paragraph") {
    return (
      <p key={key} className="font-sans text-sm leading-[1.5] text-anthracite/90 sm:text-base">
        {block.text}
      </p>
    );
  }

  if (block.type === "highlighted") {
    return (
      <blockquote
        key={key}
        className="rounded-r-[1.5rem] border-l-4 border-or bg-creme-clair px-5 py-4 font-serif text-lg italic leading-tight text-vert shadow-sm sm:text-xl"
      >
        {block.text}
      </blockquote>
    );
  }

  if (block.type === "bulletList") {
    return (
      <ul key={key} className="space-y-1.5">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
            <span className="font-sans text-sm leading-tight text-anthracite/90 sm:text-base">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ol
      key={key}
      className="list-decimal space-y-1.5 pl-6 marker:font-serif marker:font-semibold marker:text-or-fonce"
    >
      {block.items.map((item) => (
        <li key={item} className="pl-1 font-sans text-sm leading-tight text-anthracite/90 sm:text-base">
          {item}
        </li>
      ))}
    </ol>
  );
}

/**
 * Lecteur générique de manifeste — reçoit un Manifesto et l'affiche sans
 * aucune logique liée à un titre précis (extensible à tout nouveau texte).
 */
export default function ManifestoReader({ manifesto }: { manifesto: Manifesto }) {
  const { slug } = manifesto;

  const ids = useMemo(() => {
    return {
      preamble: `${slug}-preambule`,
      sections: manifesto.sections.map((_, index) => `${slug}-section-${index}`),
      finalDeclaration: `${slug}-declaration-finale`,
      references: `${slug}-reperes`,
    };
  }, [slug, manifesto.sections]);

  const tocItems = useMemo<ManifestoTocItem[]>(() => {
    return [
      {
        id: ids.preamble,
        label: manifesto.preamble.shortLabel ?? manifesto.preamble.title,
      },
      ...manifesto.sections.map((section, index) => ({
        id: ids.sections[index],
        label: section.shortLabel ?? section.title,
        number: section.number,
      })),
      {
        id: ids.finalDeclaration,
        label: manifesto.finalDeclaration.shortLabel ?? manifesto.finalDeclaration.title,
      },
      {
        id: ids.references,
        label: manifesto.references.shortLabel ?? "Repères",
      },
    ];
  }, [ids, manifesto]);

  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">("idle");

  const canShare = typeof navigator !== "undefined" && "share" in navigator;
  const canCopy =
    typeof navigator !== "undefined" &&
    typeof navigator.clipboard?.writeText === "function";

  const handleShare = async () => {
    const url = window.location.href;
    if (canShare) {
      try {
        await navigator.share({
          title: manifesto.title,
          text: `${manifesto.title} — ${manifesto.subtitle}`,
          url,
        });
      } catch {
        /* Partage annulé par l'utilisateur : rien à faire. */
      }
      return;
    }
    if (canCopy) {
      try {
        await navigator.clipboard.writeText(url);
        setShareStatus("copied");
        setTimeout(() => setShareStatus("idle"), 2500);
      } catch {
        setShareStatus("error");
        setTimeout(() => setShareStatus("idle"), 2500);
      }
    }
  };

  return (
    <>
      <ManifestoProgress />

      <a
        href="/bibliotheque"
        onClick={(event) => {
          event.preventDefault();
          navigate("/bibliotheque");
        }}
        className="fixed right-4 top-24 z-40 inline-flex items-center gap-2 rounded-full bg-creme-clair px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-vert shadow-lg ring-1 ring-or/30 transition hover:bg-white hover:text-or focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or md:right-8 lg:right-10"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Retour à la bibliothèque
      </a>

      {/* ——— En-tête éditorial du manifeste ——— */}
      <section
        className="relative -mx-4 md:-mx-8 lg:-mx-10 -mt-20 md:-mt-24 lg:-mt-28 z-0 overflow-hidden bg-vert-fonce text-white shadow-2xl"
        aria-labelledby="manifeste-titre"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, #d4a84b 0%, transparent 40%), radial-gradient(circle at 85% 80%, #f5f1e6 0%, transparent 35%)",
          }}
        />
        <div className="relative mx-auto max-w-[1440px] px-6 py-12 md:py-16 lg:px-10 lg:py-20">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="/manifestes"
              onClick={(event) => {
                event.preventDefault();
                navigate("/manifestes");
              }}
              className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wide text-or-clair transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Retour aux manifestes
            </a>
          </div>

          <p className="mt-10 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
            Bibliothèque du Muntu — Manifestes
          </p>

          <h1
            id="manifeste-titre"
            className="mt-5 max-w-3xl font-serif text-4xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl"
          >
            {manifesto.title}
          </h1>
          <p className="mt-5 whitespace-pre-line font-serif text-xl italic leading-snug text-creme sm:text-2xl">
            {manifesto.subtitle}
          </p>
          {manifesto.inspiration ? (
            <p className="mt-6 font-sans text-sm uppercase tracking-[0.12em] text-or-clair/90">
              {manifesto.inspiration}
            </p>
          ) : null}
        </div>
      </section>

      {/* ——— Sommaire + contenu ——— */}
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <ManifestoToc items={tocItems} />

          <article className="mx-auto w-full max-w-[840px]">
            <section
              id={ids.preamble}
              className="scroll-mt-28 rounded-[1.5rem] border border-or/20 bg-creme-clair px-5 py-5 shadow-sm sm:px-6"
            >
              <SectionHeading id={ids.preamble} section={manifesto.preamble} />
              <div className="mt-3 space-y-2">{manifesto.preamble.blocks.map(renderBlock)}</div>
            </section>

            {manifesto.sections.map((section, index) => (
              <section key={ids.sections[index]} id={ids.sections[index]} className="scroll-mt-28 pt-5">
                <SectionHeading id={ids.sections[index]} section={section} />
                <div className="mt-3 space-y-2">{section.blocks.map(renderBlock)}</div>
              </section>
            ))}
            <section
              id={ids.finalDeclaration}
              className="relative mt-5 overflow-hidden rounded-[2rem] border border-or/40 bg-vert-profond px-5 py-6 text-center shadow-lg sm:px-8"
              aria-labelledby={ids.finalDeclaration}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                aria-hidden
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 15%, #d4a84b 0%, transparent 40%), radial-gradient(circle at 85% 85%, #f5f1e6 0%, transparent 35%)",
                }}
              />
              <h2
                id={ids.finalDeclaration}
                className="relative font-serif text-2xl font-semibold uppercase tracking-wide text-or-clair sm:text-3xl"
              >
                {manifesto.finalDeclaration.title}
              </h2>
              <span className="mx-auto mt-3 h-px w-16 bg-or/60" aria-hidden />
              <div className="relative mx-auto mt-4 max-w-[560px] space-y-2">
                {manifesto.finalDeclaration.blocks.map((block, index) =>
                  block.type === "paragraph" ? (
                    <p
                      key={block.text}
                      className="font-serif text-xl italic leading-snug text-white sm:text-2xl"
                    >
                      {block.text}
                    </p>
                  ) : (
                    renderBlock(block, index)
                  ),
                )}
              </div>
            </section>

            <section id={ids.references} className="scroll-mt-28 pt-5">
              <SectionHeading id={ids.references} section={{ title: manifesto.references.title }} />
              {manifesto.references.numbered ? (
                <ol className="mt-3 list-decimal space-y-2 pl-6 marker:font-serif marker:font-semibold marker:text-or-fonce">
                  {manifesto.references.items.map((ref) => (
                    <li
                      key={ref.text}
                      className="pl-1 font-serif text-base italic leading-snug text-anthracite/90 sm:text-lg"
                    >
                      {ref.text}
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="mt-3 space-y-2">
                  {manifesto.references.items.map((ref) => (
                    <li key={ref.text} className="flex items-start gap-3">
                      <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-or" aria-hidden />
                      <span className="font-serif text-base italic leading-snug text-anthracite/90 sm:text-lg">
                        {ref.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="print:hidden mt-8 flex flex-col items-center gap-3 text-center">
              <span className="h-px w-24 bg-or/40" aria-hidden />
              <h2 className="font-serif text-xl font-semibold uppercase tracking-wide text-vert">
                Partager le manifeste
              </h2>
              {canShare || canCopy ? (
                <button
                  type="button"
                  onClick={handleShare}
                  className="btn-or inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wide shadow-md transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
                >
                  <Share2 className="h-4 w-4" aria-hidden />
                  Partager le manifeste
                </button>
              ) : null}
              <div role="status" aria-live="polite">
                {shareStatus === "copied" ? (
                  <p className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-vert">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                    Lien copié dans le presse-papiers.
                  </p>
                ) : null}
                {shareStatus === "error" ? (
                  <p className="font-sans text-xs font-medium text-or-fonce">
                    Impossible de partager le lien.
                  </p>
                ) : null}
              </div>

              <a
                href="/manifestes"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/manifestes");
                }}
                className="btn-or inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Retour aux manifestes
              </a>
              <a
                href="/bibliotheque"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/bibliotheque");
                }}
                className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wide text-vert transition-colors hover:text-or focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Retour à la bibliothèque
              </a>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}