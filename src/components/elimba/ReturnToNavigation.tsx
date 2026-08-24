import { ArrowUp } from "lucide-react";

export default function ReturnToNavigation() {
  return (
    <a
      href="#elimba-architecture"
      className="mx-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-vert transition-colors hover:text-or focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or"
    >
      <ArrowUp className="h-4 w-4" aria-hidden />
      Retourner à la navigation rapide
    </a>
  );
}