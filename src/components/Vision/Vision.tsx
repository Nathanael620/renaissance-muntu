import { ArrowRight, Eye } from "lucide-react";
import { visionText } from "../../data/siteData";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Bloc Notre Vision — grille accueil (maquette)
 */
export default function Vision() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <article
      id="vision"
      ref={ref}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-or/30 bg-creme-clair p-6 shadow-sm md:p-7",
        visible && "animate-fade-in",
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-vert">
          <Eye className="h-5 w-5 text-or-clair" aria-hidden />
        </span>
        <h2 className="font-serif text-lg font-semibold uppercase tracking-wide text-vert md:text-xl">
          Notre vision
        </h2>
      </div>
      <div className="mb-4 h-px w-full bg-or/30" aria-hidden />
      <p className="flex-1 font-sans text-sm leading-relaxed text-anthracite">
        {visionText}
      </p>
      <a
        href="#mission"
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-vert px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-vert-fonce"
      >
        En savoir plus
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </a>
    </article>
  );
}
