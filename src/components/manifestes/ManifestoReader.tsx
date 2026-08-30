import { useMemo, useState } from "react";
import { ArrowLeft, Check, Lock, Share2, ShoppingBag, UserRound } from "lucide-react";
import type {
  Manifesto,
  ManifestoBlock,
  ManifestoSection,
} from "../../data/manifestesData";
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

/** Tranche d'aperçu : un en-tête de section + les blocs exposés librement. */
interface PreviewSlice {
  id: string;
  section: ManifestoSection;
}

/**
 * Lecteur générique de manifeste — reçoit un Manifesto et l'affiche sans
 * aucune logique liée à un titre précis (extensible à tout nouveau texte).
 */
export default function ManifestoReader({ manifesto }: { manifesto: Manifesto }) {
  const { slug } = manifesto;
  const isPaywalled = manifesto.paywall === true;
  const previewBlocks = manifesto.previewBlocks ?? 6;

  const ids = useMemo(() => {
    return {
      preamble: `${slug}-preambule`,
      sections: manifesto.sections.map((_, index) => `${slug}-section-${index}`),
      finalDeclaration: `${slug}-declaration-finale`,
      references: `${slug}-reperes`,
    };
  }, [slug, manifesto.sections]);

  const priceLabel =
    manifesto.price != null
      ? `${manifesto.price.toLocaleString("fr-FR")} ${manifesto.currency ?? ""}`.trim()
      : null;

  /**
   * Aperçu libre d'un manifeste payant : les `previewBlocks` premiers blocs
   * (préambule puis première(s) section(s)) ; le reste du texte reste payant.
   */
  const previewSlices = useMemo<PreviewSlice[]>(() => {
    if (!isPaywalled) return [];
    const ordered: { id: string; section: ManifestoSection }[] = [
      { id: ids.preamble, section: manifesto.preamble },
      ...manifesto.sections.map((section, index) => ({
        id: ids.sections[index],
        section,
      })),
    ];
    const slices: PreviewSlice[] = [];
    let remaining = previewBlocks;
    for (const { id, section } of ordered) {
      if (remaining <= 0) break;
      const take = Math.min(section.blocks.length, remaining);
      if (take <= 0) continue;
      slices.push({ id, section: { ...section, blocks: section.blocks.slice(0, take) } });
      remaining -= take;
    }
    return slices;
  }, [ids, manifesto, isPaywalled, previewBlocks]);

  const tocItems = useMemo<ManifestoTocItem[]>(() => {
    if (isPaywalled) {
      return previewSlices.map((slice) => ({
        id: slice.id,
        label: slice.section.shortLabel ?? slice.section.title,
        number: slice.section.number,
      }));
    }
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
  }, [ids, manifesto, isPaywalled, previewSlices]);

  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">("idle");

  const canShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";
  const canCopy =
    typeof navigator !== "undefined" &&
    (typeof navigator.clipboard?.writeText === "function" ||
      typeof document.execCommand === "function");

  /**
   * Copie fiable : Clipboard API d'abord, puis repli sur `execCommand("copy")`
   * (anciens navigateurs, iframes, contextes sans permission clipboard).
   */
  const copyLink = async (text: string): Promise<void> => {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.clipboard?.writeText === "function"
    ) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch {
        /* On retombe sur le repli ci-dessous. */
      }
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    if (!ok) throw new Error("copy-failed");
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (canShare) {
      try {
        await navigator.share({
          title: manifesto.title,
          text: `${manifesto.title} — ${manifesto.subtitle}`.replace(/\n+/g, " "),
          url,
        });
        return;
      } catch (error) {
        /* L'utilisateur a annulé la fenêtre de partage : rien à faire. */
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        /* Échec du partage natif (desktop, contexte non sécurisé…) :
           repli sur la copie du lien dans le presse-papiers. */
      }
    }
    try {
      await copyLink(url);
      setShareStatus("copied");
    } catch {
      setShareStatus("error");
    }
    setTimeout(() => setShareStatus("idle"), 2500);
  };

  return (
    <>
      <ManifestoProgress />

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
        <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:py-28 lg:px-10 lg:py-32">
          <a
            href="/bibliotheque"
            onClick={(event) => {
              event.preventDefault();
              navigate("/bibliotheque");
            }}
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wide text-or-clair transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour à la bibliothèque
          </a>

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
          {manifesto.author ? (
            <p className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-or-clair">
              <UserRound className="h-3.5 w-3.5" aria-hidden />
              {manifesto.author}
            </p>
          ) : null}
        </div>
      </section>

      {/* ——— Sommaire + contenu ——— */}
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
          <ManifestoToc items={tocItems} />

          <article className="mx-auto w-full max-w-[840px]">
            {isPaywalled && previewSlices.length > 0 ? (
              previewSlices.map((slice, sliceIndex) => (
                <section
                  key={slice.id}
                  id={slice.id}
                  className={
                    sliceIndex === 0
                      ? "scroll-mt-28 rounded-[1.5rem] border border-or/20 bg-creme-clair px-6 py-8 shadow-sm sm:px-8"
                      : "scroll-mt-28 pt-8"
                  }
                >
                  <SectionHeading id={slice.id} section={slice.section} />
                  <div className="mt-5 space-y-2">
                    {slice.section.blocks.map((block, index) => renderBlock(block, index))}
                  </div>
                </section>
              ))
            ) : (
              <>
                <section
              id={ids.preamble}
              className="scroll-mt-28 rounded-[1.5rem] border border-or/20 bg-creme-clair px-6 py-8 shadow-sm sm:px-8"
            >
              <SectionHeading id={ids.preamble} section={manifesto.preamble} />
              <div className="mt-5 space-y-2">{manifesto.preamble.blocks.map(renderBlock)}</div>
            </section>

            {manifesto.sections.map((section, index) => (
              <section key={ids.sections[index]} id={ids.sections[index]} className="scroll-mt-28 pt-8">
                <SectionHeading id={ids.sections[index]} section={section} />
                <div className="mt-5 space-y-2">{section.blocks.map(renderBlock)}</div>
              </section>
            ))}
            <section
              id={ids.finalDeclaration}
              className="relative mt-8 overflow-hidden rounded-[2rem] border border-or/40 bg-vert-profond px-6 py-10 text-center shadow-lg sm:px-10"
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
              <span className="mx-auto mt-5 h-px w-16 bg-or/60" aria-hidden />
              <div className="relative mx-auto mt-6 max-w-[560px] space-y-2">
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

            <section id={ids.references} className="scroll-mt-28 pt-8">
              <SectionHeading id={ids.references} section={{ title: manifesto.references.title }} />
              {manifesto.references.numbered ? (
                <ol className="mt-5 list-decimal space-y-2 pl-6 marker:font-serif marker:font-semibold marker:text-or-fonce">
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
                <ul className="mt-5 space-y-2">
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
              </>
            )}

            {isPaywalled ? (
              <section
                className="relative mt-8 overflow-hidden rounded-[2rem] border border-or/40 bg-vert-profond px-6 py-12 text-center shadow-lg sm:px-10"
                aria-labelledby="paywall-titre"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  aria-hidden
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 15%, #d4a84b 0%, transparent 40%), radial-gradient(circle at 85% 85%, #f5f1e6 0%, transparent 35%)",
                  }}
                />
                <div className="relative mx-auto max-w-[560px]">
                  <span
                    className="inline-flex items-center justify-center rounded-full border border-or/40 bg-or/10 p-3"
                    aria-hidden
                  >
                    <Lock className="h-5 w-5 text-or-clair" />
                  </span>
                  <h2
                    id="paywall-titre"
                    className="mt-5 font-serif text-2xl font-semibold uppercase tracking-wide text-white sm:text-3xl"
                  >
                    Texte intégral réservé aux lecteurs
                  </h2>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-white/85">
                    Ce manifeste n&apos;est plus consulté gratuitement dans son
                    intégralité. Vous venez de lire un aperçu — le texte complet
                    est accessible après achat sur notre boutique.
                  </p>

                  <div className="mt-7">
                    {priceLabel ? (
                      <p className="inline-flex items-center rounded-full border border-or/40 bg-or/10 px-6 py-2 font-serif text-2xl font-bold text-or-clair">
                        {priceLabel}
                      </p>
                    ) : (
                      <p className="inline-flex items-center rounded-full border border-or-fonce/40 bg-or/10 px-6 py-2 font-sans text-xs font-bold uppercase tracking-[0.14em] text-white/85">
                        Prix à définir
                      </p>
                    )}
                  </div>

                  <div className="mt-7">
                    {manifesto.shopUrl ? (
                      <a
                        href={manifesto.shopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-or inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        <ShoppingBag className="h-4 w-4" aria-hidden />
                        Acheter le manifeste
                      </a>
                    ) : (
                      <div>
                        <button
                          type="button"
                          disabled
                          aria-disabled="true"
                          title="Achat Chariow — disponible prochainement"
                          className="btn-or inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide opacity-60 shadow-lg"
                        >
                          <ShoppingBag className="h-4 w-4" aria-hidden />
                          Acheter le manifeste
                        </button>
                        <p className="mt-3 font-sans text-[10px] font-medium uppercase tracking-wide text-white/70">
                          Achat disponible prochainement
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ) : null}

            <section className="print:hidden mt-16 flex flex-col items-center gap-4 text-center">
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