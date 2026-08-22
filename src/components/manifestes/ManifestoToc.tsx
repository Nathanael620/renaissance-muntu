import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";

export interface ManifestoTocItem {
  id: string;
  label: string;
  number?: string;
}

/**
 * Table des matières d'un manifeste.
 * - Desktop : colonne sticky (à côté du contenu de lecture).
 * - Mobile/tablette : bloc compact en grille de liens.
 * La section active est détectée au défilement (IntersectionObserver).
 */
export default function ManifestoToc({ items }: { items: ManifestoTocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    items.forEach((item) => {
      const node = document.getElementById(item.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [items]);

  const renderLinks = (isDesktop: boolean) => (
    <ul
      className={
        isDesktop
          ? "space-y-1 border-l border-or/25"
          : "grid grid-cols-1 gap-2 sm:grid-cols-2"
      }
    >
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={cn(
              "group inline-flex items-baseline gap-2 rounded-md font-sans text-xs uppercase tracking-[0.08em] transition-colors",
              isDesktop
                ? "-ml-px block border-l-2 py-2 pl-3 pr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
                : "w-full border border-or/20 bg-white px-3 py-2.5 shadow-sm hover:border-or/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or",
              activeId === item.id
                ? "border-or font-semibold text-or-fonce"
                : "border-transparent text-anthracite/70 hover:text-vert",
            )}
          >
            {item.number ? (
              <span
                className={cn(
                  "font-serif font-semibold",
                  activeId === item.id ? "text-or-fonce" : "text-vert",
                )}
              >
                {item.number}.
              </span>
            ) : null}
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile / tablette : bloc compact */}
      <nav
        aria-label="Table des matières"
        className="print:hidden rounded-[1.5rem] border border-or/25 bg-creme-clair p-5 shadow-sm lg:hidden"
      >
        <h2 className="font-serif text-lg font-semibold uppercase tracking-wide text-vert">
          Sommaire
        </h2>
        <div className="mt-4">{renderLinks(false)}</div>
      </nav>

      {/* Desktop : sticky */}
      <nav
        aria-label="Table des matières"
        className="print:hidden sticky top-28 hidden max-h-[calc(100dvh-8rem)] overflow-y-auto self-start pr-2 lg:block"
      >
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-or-fonce">
          Sommaire
        </p>
        <div className="mt-4">{renderLinks(true)}</div>
      </nav>
    </>
  );
}